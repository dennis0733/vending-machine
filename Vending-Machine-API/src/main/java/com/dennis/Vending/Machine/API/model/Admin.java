package com.dennis.Vending.Machine.API.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;


@Entity
public class Admin {

    @Id
    @GeneratedValue
    private Long id;
    private String password;

    private Long totalmoney;
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {this.password = password; }

    public Long getTotalmoney() {
        return totalmoney;
    }

    public void setTotalmoney(Long totalmoney) {
        this.totalmoney = totalmoney;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
