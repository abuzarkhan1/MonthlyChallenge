package com.abuzar.CrudSpringBoot.Controller;

import com.abuzar.CrudSpringBoot.Challenge;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ChallengeController {

    private List<Challenge> challenges = new ArrayList<>();

    public ChallengeController() {
        challenges.add(new Challenge(1, "Challenge 1", "Description for challenge 1"));
    }

    @GetMapping("/challenges")
    public List<Challenge> getAllChallenges() {
        return challenges;
    }

    @PostMapping("/challenges")
    public String addChallenge(@RequestBody Challenge challenge) {
        challenges.add(challenge);
        return "Challenge added successfully";
    }
}
