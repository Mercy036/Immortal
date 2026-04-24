package com.immortal.backend.controller;

import com.immortal.backend.model.Submission;
import com.immortal.backend.model.User;
import com.immortal.backend.repository.MatchRepository;
import com.immortal.backend.repository.UserRepository;
import com.immortal.backend.repository.SubmissionRepository;
import com.immortal.backend.service.CodeExecutionService;
import com.immortal.backend.service.MatchmakingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.transaction.annotation.Transactional;

@RestController
@RequestMapping("/match")
@Transactional(readOnly = true)
public class MatchController {

    private final MatchmakingService matchmakingService;
    private final CodeExecutionService codeExecutionService;
    private final UserRepository userRepository;
    private final MatchRepository matchRepository;
    private final SubmissionRepository submissionRepository;

    public MatchController(MatchmakingService matchmakingService, CodeExecutionService codeExecutionService, UserRepository userRepository, MatchRepository matchRepository, SubmissionRepository submissionRepository) {
        this.matchmakingService = matchmakingService;
        this.codeExecutionService = codeExecutionService;
        this.userRepository = userRepository;
        this.matchRepository = matchRepository;
        this.submissionRepository = submissionRepository;
    }

    @GetMapping("/find")
    public ResponseEntity<String> findMatch(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName()).orElseThrow();
        matchmakingService.joinQueue(user.getId());
        return ResponseEntity.ok("Joined matchmaking queue");
    }

    @PostMapping("/submit")
    @Transactional
    public ResponseEntity<?> submitCode(@RequestBody CodeSubmissionRequest request, Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName()).orElseThrow();
        var match = matchRepository.findById(request.matchId()).orElseThrow();

        Submission submission = new Submission();
        submission.setUser(user);
        submission.setMatch(match);
        submission.setCode(request.code());
        submission.setLanguage(request.language());
        submission.setStatus(Submission.SubmissionStatus.PENDING);
        
        submission = submissionRepository.save(submission);

        // Run synchronously so we can return the result immediately
        codeExecutionService.evaluateSubmission(submission);

        return ResponseEntity.ok(new SubmissionResultDto(
            submission.getStatus().name(),
            submission.getExecutionTime() != null ? String.format("%.2fms", submission.getExecutionTime() * 1000) : "N/A",
            submission.getMemoryUsage() != null ? String.format("%.2fMB", submission.getMemoryUsage() / 1024.0) : "N/A"
        ));
    }

    @GetMapping("/result/{matchId}")
    public ResponseEntity<?> getMatchResult(@PathVariable Long matchId) {
        var match = matchRepository.findById(matchId).orElseThrow();
        return ResponseEntity.ok(new MatchDto(
            match.getId(),
            match.getPlayer1().getUsername(),
            match.getPlayer2().getUsername(),
            match.getProblem().getId(),
            match.getProblem().getTitle(),
            match.getProblem().getDescription(),
            match.getStatus().name()
        ));
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentMatch(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName()).orElseThrow();
        java.util.Optional<com.immortal.backend.model.Match> currentMatch = matchRepository.findFirstByPlayer1IdAndStatusOrPlayer2IdAndStatus(
            user.getId(), com.immortal.backend.model.Match.MatchStatus.ONGOING,
            user.getId(), com.immortal.backend.model.Match.MatchStatus.ONGOING
        );
        
        if (currentMatch.isPresent()) {
            var match = currentMatch.get();
            return ResponseEntity.ok(new MatchDto(
                match.getId(),
                match.getPlayer1().getUsername(),
                match.getPlayer2().getUsername(),
                match.getProblem().getId(),
                match.getProblem().getTitle(),
                match.getProblem().getDescription(),
                match.getStatus().name()
            ));
        }
        
        return ResponseEntity.notFound().build();
    }
}

record CodeSubmissionRequest(Long matchId, String code, String language) {}
record MatchDto(Long id, String player1, String player2, Long problemId, String problemTitle, String problemDescription, String status) {}
record SubmissionResultDto(String status, String executionTime, String memory) {}
