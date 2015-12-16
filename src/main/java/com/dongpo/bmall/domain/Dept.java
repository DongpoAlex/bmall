package com.dongpo.bmall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by AlexBob on 2015/12/16.
 */
@Entity(name = "v_SGroup")
public class Dept {

    @Id
    private int Id;

    private String name;

    @Column(name = "prantid")
    private int prentId;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrentId() {
        return prentId;
    }

    public void setPrentId(int prentId) {
        this.prentId = prentId;
    }
}
