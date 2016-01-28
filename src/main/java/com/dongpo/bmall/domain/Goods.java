package com.dongpo.bmall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by AlexBob on 2015/12/16.
 */
@Entity(name = "wholegoods")
public class Goods {

    @Id
    private int id;

    @Column(name = "goodsid")
    private int goodsId;

    private String name;

    @Column(name = "BarcodeID")
    private String barcode;

    @Column(name = "unitname")
    private String unitName;

    @Column(name = "guestid")
    private String guestId;

    private double price;

    @Column(name = "deptid")
    private int deptId;

    @Column(name = "dept2")
    private int twoDeptId;

    private String spec;

    @Column(name = "orderpknum1")
    private int oPKNum;

    @Column(name = "orderpkname1")
    private String oPKName;

    @Column(name = "orderpkspec1")
    private String oPKSpec;

    // @OneToMany(mappedBy = "goodsId")
    //public int getId() {return id;}

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


    public String getGuestId() {
        return guestId;
    }

    public double getPrice() {
        return price;
    }


    // public Set<GoodsExtend> getExtendSet() {
    //   return extendSet;
    //}

    public int getDeptId() {
        return deptId;
    }


    public String getSpec() {
        return spec;
    }

    public int getoPKNum() {
        return oPKNum;
    }

    public String getoPKSpec() {
        return oPKSpec;
    }

    public String getoPKName() {
        return oPKName;
    }

    public int getTwoDeptId() {
        return twoDeptId;
    }
}
