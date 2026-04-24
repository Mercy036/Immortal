package com.immortal.backend.service;

import com.immortal.backend.model.Match;
import com.immortal.backend.model.Problem;
import com.immortal.backend.model.User;
import com.immortal.backend.repository.MatchRepository;
import com.immortal.backend.repository.ProblemRepository;
import com.immortal.backend.repository.UserRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

@Service
public class MatchmakingService {

    private final MatchRepository matchRepository;
    private final UserRepository userRepository;
    private final ProblemRepository problemRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private static final Logger log = Logger.getLogger(MatchmakingService.class.getName());

    // In-memory queue: userId -> rating
    private final ConcurrentHashMap<Long, Double> queue = new ConcurrentHashMap<>();

    private static final int ELO_THRESHOLD = 500; // generous threshold

    public MatchmakingService(MatchRepository matchRepository, UserRepository userRepository, ProblemRepository problemRepository, SimpMessagingTemplate messagingTemplate) {
        this.matchRepository = matchRepository;
        this.userRepository = userRepository;
        this.problemRepository = problemRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public void joinQueue(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        queue.put(userId, (double) user.getRating());
        log.info("User " + userId + " (" + user.getUsername() + ") joined queue. Queue size: " + queue.size());
    }

    public void leaveQueue(Long userId) {
        queue.remove(userId);
        log.info("User " + userId + " left the queue.");
    }

    @Scheduled(fixedRate = 2000)
    public synchronized void matchPlayers() {
        if (queue.size() < 2) return;

        log.info("Matchmaking tick — queue size: " + queue.size());

        List<Map.Entry<Long, Double>> players = new ArrayList<>(queue.entrySet());

        for (int i = 0; i < players.size() - 1; i++) {
            Long p1Id = players.get(i).getKey();
            Double p1Rating = players.get(i).getValue();

            if (!queue.containsKey(p1Id)) continue; // already matched

            for (int j = i + 1; j < players.size(); j++) {
                Long p2Id = players.get(j).getKey();
                Double p2Rating = players.get(j).getValue();

                if (!queue.containsKey(p2Id)) continue; // already matched

                if (Math.abs(p1Rating - p2Rating) <= ELO_THRESHOLD) {
                    // Remove both from queue first to prevent double-matching
                    queue.remove(p1Id);
                    queue.remove(p2Id);
                    createMatch(p1Id, p2Id);
                    break;
                }
            }
        }
    }

    private void createMatch(Long player1Id, Long player2Id) {
        User p1 = userRepository.findById(player1Id).orElseThrow();
        User p2 = userRepository.findById(player2Id).orElseThrow();

        // Get any available problem
        Optional<Problem> problemOpt = problemRepository.findAll().stream().findFirst();
        if (problemOpt.isEmpty()) {
            log.warning("No problems available for match.");
            return;
        }

        Match match = new Match();
        match.setPlayer1(p1);
        match.setPlayer2(p2);
        match.setProblem(problemOpt.get());
        match.setStatus(Match.MatchStatus.ONGOING);
        match.setStartTime(LocalDateTime.now());

        matchRepository.save(match);
        log.info("✅ Match created (ID=" + match.getId() + ") between " + p1.getUsername() + " and " + p2.getUsername());
    }
}
