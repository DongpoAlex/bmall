package com.dongpo.bmall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by AlexBob on 2015/12/24.
 */
@Entity(name = "wholeprice")
public class GoodsPrice {

    @Id
    private int Id;

    @Column(name = "goodsid")
    private int goodsId;

    @Column(name = "guestid")
    private String guestId;

    private double price;

    public int getId() {
        return Id;
    }

    public int getGoodsId() {
        return goodsId;
    }

    public String getGuestId() {
        return guestId;
    }


    public double getPrice() {
        return price;
    }

}
