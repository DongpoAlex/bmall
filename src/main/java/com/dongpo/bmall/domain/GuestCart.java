package com.dongpo.bmall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by AlexBob on 2015/12/26.
 */
@Entity(name = "wholeprice")
public class GuestCart {

    @Id
    private int id;

    @Column(name = "guestid")
    private String guestId;

    @Column(name = "goodsid")
    private int goodsId;

    public int getId() {
        return id;
    }

    public String getGuestId() {
        return guestId;
    }

    public int getGoodsId() {
        return goodsId;
    }
}
