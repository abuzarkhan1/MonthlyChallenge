package com.abuzar.CrudSpringBoot.Controller;

import com.abuzar.CrudSpringBoot.Challenge;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ChallengeController {

    private List<Challenge> challenges = new ArrayList<>();

    public ChallengeController() {
        challenges.add(new Challenge(1, "Challenge 1", "Description for challenge 1"));
        challenges.add(new Challenge(2, "Challenge 2", "Description for challenge 2"));
        challenges.add(new Challenge(3, "Challenge 3", "Description for challenge 3"));
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

    // make an end point to get challenge by id
    @GetMapping("/challenges/{id}")
    public Challenge getChallengeById(@PathVariable long id) {
        for (Challenge challenge : challenges) {
            if (challenge.getId() == id) {
                return challenge;
            }
        }
        return null;
    }
}
