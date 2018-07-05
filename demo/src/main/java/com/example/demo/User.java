package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String firstName;

    private String surName;
    
    private String accNumber;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstname) {
		this.firstName = firstname;
	}

	public String getSurName() {
		return surName;
	}

	public void setSurName(String surname) {
		this.surName = surname;
	}

	public String getAccNumber() {
		return accNumber;
	}
	
	public void setAccNumber(String accNumber) {
		this.accNumber = accNumber;
	}
}