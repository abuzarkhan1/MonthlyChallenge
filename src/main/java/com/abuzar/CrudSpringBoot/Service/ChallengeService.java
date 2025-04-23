package com.abuzar.CrudSpringBoot.Service;

import com.abuzar.CrudSpringBoot.Challenge;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChallengeService {

    private List<Challenge> challenges = new ArrayList<>();
    private long nextId = 1L;

    public ChallengeService(){


    }

    public List<Challenge> getAllChallenges(){
        return challenges;
    }


    public Boolean addChallenge(Challenge challenge){
        if (challenge != null){
            challenge.setId(nextId++);
            challenges.add(challenge);
            return true;
        }else {
            return false;
        }
    }

    public Challenge getChallengeById(String month){
        for (Challenge challenge : challenges) {
            if (challenge.getMonth().equals(month)) {
                return challenge;
            }
        }
        return null;
    }

    public boolean updateChallenge(long id, Challenge updatedChallenge) {
       for (Challenge challenge : challenges){
              if (challenge.getId() == id) {
                challenge.setName(updatedChallenge.getName());
                challenge.setDescription(updatedChallenge.getDescription());
                challenge.setMonth(updatedChallenge.getMonth());
                return true;
              }
       }
        return false;
    }

    public boolean deleteChallenge(long id) {
        for (Challenge challenge : challenges) {
            if (challenge.getId() == id) {
                challenges.remove(challenge);
                return true;
            }
        }
        return false;
    }

}
