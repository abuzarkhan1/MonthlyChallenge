package com.abuzar.CrudSpringBoot.Controller;

import com.abuzar.CrudSpringBoot.Challenge;
import com.abuzar.CrudSpringBoot.Service.ChallengeService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ChallengeController {

   private ChallengeService challengeService;


    public ChallengeController() {

    }

    @GetMapping("/challenges")
    public List<Challenge> getAllChallenges() {
        return challengeService.getAllChallenges();
    }

    @PostMapping("/challenges")
    public Boolean addChallenge(@RequestBody Challenge challenge) {
        return challengeService.addChallenge(challenge);
    }

    // make an end point to get challenge by id
    @GetMapping("/challenges/{id}")
    public Challenge getChallengeById(@PathVariable long id) {
        return challengeService.getChallengeById(id);
    }
}
