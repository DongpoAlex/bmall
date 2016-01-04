package com.dongpo.bmall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by AlexBob on 2016/1/4.
 */
@Entity
@Table(name = "wholeguest")
public class Customer{

    @Id
    private String Id;

    @Column(name = "guestname")
    private String name;

    public String getId() {
        return Id;
    }

    public String getName() {
        return name;
    }
}
