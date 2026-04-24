package com.immortal.backend.service;

import com.immortal.backend.model.Problem;
import com.immortal.backend.model.Submission;
import com.immortal.backend.model.TestCase;
import com.immortal.backend.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class CodeExecutionService {

    private final SubmissionRepository submissionRepository;
    private static final Logger log = Logger.getLogger(CodeExecutionService.class.getName());

    @Value("${judge0.api-url}")
    private String judge0ApiUrl;

    @Value("${judge0.api-key}")
    private String judge0ApiKey;

    @Value("${judge0.api-host}")
    private String judge0ApiHost;

    private final RestTemplate restTemplate = new RestTemplate();

    public CodeExecutionService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    public void evaluateSubmission(Submission submission) {
        submission.setStatus(Submission.SubmissionStatus.EVALUATING);
        submissionRepository.save(submission);

        Problem problem = submission.getMatch().getProblem();
        int passed = 0;
        double totalExecutionTime = 0.0;
        double maxMemoryUsage = 0.0;

        java.util.List<TestCase> testCases = problem.getTestCases();
        if (testCases == null || testCases.isEmpty()) {
            log.warning("Problem " + problem.getId() + " has no test cases. Cannot evaluate.");
            submission.setStatus(Submission.SubmissionStatus.RUNTIME_ERROR);
            submissionRepository.save(submission);
            return;
        }

        for (TestCase testCase : testCases) {
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("source_code", submission.getCode());
            requestBody.put("language_id", getLanguageId(submission.getLanguage()));
            requestBody.put("stdin", testCase.getInputData());
            requestBody.put("expected_output", testCase.getExpectedOutput());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            // Only add RapidAPI headers if we have a key (for remote Judge0).
            // Local Judge0 does not need these headers.
            if (judge0ApiKey != null && !judge0ApiKey.isEmpty()) {
                headers.set("x-rapidapi-key", judge0ApiKey);
                headers.set("x-rapidapi-host", judge0ApiHost);
            }

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            try {
                ResponseEntity<Map> response = restTemplate.postForEntity(
                        judge0ApiUrl + "/submissions?base64_encoded=false&wait=true",
                        entity,
                        Map.class
                );

                if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                    Map<String, Object> body = response.getBody();
                    Map<String, Object> status = (Map<String, Object>) body.get("status");
                    Integer statusId = (Integer) status.get("id");

                    if (statusId == 3) {
                        passed++;
                        totalExecutionTime += Double.parseDouble(body.get("time").toString());
                        maxMemoryUsage = Math.max(maxMemoryUsage, Double.parseDouble(body.get("memory").toString()));
                    } else {
                        break;
                    }
                }
            } catch (Exception e) {
                log.log(Level.SEVERE, "Error communicating with Judge0", e);
                submission.setStatus(Submission.SubmissionStatus.RUNTIME_ERROR);
                submissionRepository.save(submission);
                return;
            }
        }

        submission.setPassedTestCases(passed);
        submission.setTotalTestCases(problem.getTestCases().size());
        submission.setExecutionTime(totalExecutionTime);
        submission.setMemoryUsage(maxMemoryUsage);

        if (passed == problem.getTestCases().size()) {
            submission.setStatus(Submission.SubmissionStatus.ACCEPTED);
            double score = 70.0 + (20.0 * (1.0 / (1.0 + totalExecutionTime))); 
            submission.setScore(score);
        } else {
            submission.setStatus(Submission.SubmissionStatus.WRONG_ANSWER);
            submission.setScore((double) passed / problem.getTestCases().size() * 70.0);
        }

        submissionRepository.save(submission);
    }

    private int getLanguageId(String language) {
        return switch (language.toLowerCase()) {
            case "java" -> 62;
            case "python" -> 71;
            case "cpp" -> 54;
            default -> 71;
        };
    }
}
