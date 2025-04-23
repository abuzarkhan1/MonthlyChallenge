package com.abuzar.CrudSpringBoot.Entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Challenge {
    @Id
    private long id;
    private String name;
    private String description;

    @Column(name = "challengeMonth")
    private String month;


    public Challenge(){}
    public Challenge(long id, String name, String description, String month) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.month = month;

    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

}
