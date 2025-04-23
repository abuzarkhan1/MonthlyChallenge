package com.abuzar.CrudSpringBoot.Controller;

import com.abuzar.CrudSpringBoot.Entities.Challenge;
import com.abuzar.CrudSpringBoot.Service.ChallengeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/challenges")
public class ChallengeController {

   private ChallengeService challengeService;


    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    @GetMapping
    public List<Challenge> getAllChallenges() {
        return challengeService.getAllChallenges();
    }

    @PostMapping
    public ResponseEntity<String> addChallenge(@RequestBody Challenge challenge) {
        boolean isChallengeAdded = challengeService.addChallenge(challenge);
        if (isChallengeAdded) {
            return new ResponseEntity<>("Challenge added successfully", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to add challenge", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{month}")
    public ResponseEntity<Challenge> getChallengeById(@PathVariable String month) {
        Challenge challenge =  challengeService.getChallenge(month);
        if (challenge != null){
            return new ResponseEntity<>(challenge, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String>  updateChallenge(@PathVariable long id, @RequestBody Challenge updatedChallenge) {
        boolean isUpdated = challengeService.updateChallenge(id, updatedChallenge);
        if (isUpdated) {
            return new ResponseEntity<>("Challenge updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to update challenge", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChallenge(@PathVariable long id) {
        boolean isDeleted = challengeService.deleteChallenge(id);
        if (isDeleted) {
            return new ResponseEntity<>("Challenge deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to delete challenge", HttpStatus.NOT_FOUND);
        }
    }
}
