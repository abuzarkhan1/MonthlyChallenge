package com.abuzar.CrudSpringBoot.Repository;

import com.abuzar.CrudSpringBoot.Entities.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {


    Optional<Challenge> findByMonthIgnoreCase(String month);
}
