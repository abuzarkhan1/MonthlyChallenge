package com.abuzar.CrudSpringBoot.Service;

import com.abuzar.CrudSpringBoot.Challenge;

import java.util.ArrayList;
import java.util.List;

public class ChallengeService {

    private List<Challenge> challenges = new ArrayList<>();

    public ChallengeService(){

        Challenge challenge = new Challenge(1L, "janurary", "Learn something new");

    }

    public List<Challenge> getAllChallenges(){
        return challenges;
    }


    public Boolean addChallenge(Challenge challenge){
        if (challenge != null){
            challenges.add(challenge);
            return true;
        }else {
            return false;
        }
    }

    public Challenge getChallengeById(long id){
        for (Challenge challenge : challenges) {
            if (challenge.getId() == id) {
                return challenge;
            }
        }
        return null;
    }

}
