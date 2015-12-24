package com.dongpo.bmall.domain;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by AlexBob on 2015/12/16.
 */
@Entity(name = "wholegoods")
public class Goods {

    @Id
    private int id;

    @Column(name = "goodsID")
    private int goodsId;

    private String name;

    @Column(name = "BarcodeID")
    private String barcode;

    @Column(name = "unitname")
    private String unitName;

    @Column(name = "guestid")
    private String guestId;

    private double price;

    @OneToMany(mappedBy = "goodsId")
    private Set<GoodsExtend> extendSet;

    public int getId() {return id;}

    public int getGoodsId() {
        return goodsId;
    }

    public String getName() {
        return name;
    }


    public String getBarcode() {
        return barcode;
    }

    public String getUnitName() {
        return unitName;
    }


    public String getGuestId() {return guestId;}

    public double getPrice() {return price;}


    public Set<GoodsExtend> getExtendSet() {
        return extendSet;
    }


}
