package com.immortal.backend.config;

import com.immortal.backend.model.Problem;
import com.immortal.backend.model.TestCase;
import com.immortal.backend.repository.ProblemRepository;
import com.immortal.backend.repository.TestCaseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(ProblemRepository problemRepository, TestCaseRepository testCaseRepository) {
        return args -> {
            if (problemRepository.count() == 0) {
                Problem problem = new Problem();
                problem.setTitle("Two Sum");
                problem.setDescription(
                    "Given an array of integers nums and an integer target, return indices of the two numbers " +
                    "such that they add up to target.\n\n" +
                    "Read from stdin:\n" +
                    "- Line 1: space-separated integers (the array)\n" +
                    "- Line 2: the target integer\n\n" +
                    "Print the two indices (0-based) separated by a space.\n\n" +
                    "Example:\n" +
                    "Input: 2 7 11 15\n        9\n" +
                    "Output: 0 1"
                );
                problem.setTimeLimit(2.0);
                problem.setMemoryLimit(256.0);
                problem = problemRepository.save(problem);

                // Test case 1: nums=[2,7,11,15], target=9 → output "0 1"
                TestCase tc1 = new TestCase();
                tc1.setProblem(problem);
                tc1.setInputData("2 7 11 15\n9");
                tc1.setExpectedOutput("0 1");
                tc1.setHidden(false);
                testCaseRepository.save(tc1);

                // Test case 2: nums=[3,2,4], target=6 → output "1 2"
                TestCase tc2 = new TestCase();
                tc2.setProblem(problem);
                tc2.setInputData("3 2 4\n6");
                tc2.setExpectedOutput("1 2");
                tc2.setHidden(false);
                testCaseRepository.save(tc2);

                // Test case 3: nums=[3,3], target=6 → output "0 1"
                TestCase tc3 = new TestCase();
                tc3.setProblem(problem);
                tc3.setInputData("3 3\n6");
                tc3.setExpectedOutput("0 1");
                tc3.setHidden(true);
                testCaseRepository.save(tc3);
            }
        };
    }
}
