package com.dongpo.bmall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by AlexBob on 2015/12/16.
 */
@Entity
@Table(name = "guest_goods")
public class Goods {

    @Id
    private int id;

    @Column(name = "goodsid")
    private int goodsId;

    private String name;

    @Column(name = "barcodeid")
    private String barcode;

    @Column(name = "unitname")
    private String unitName;

    @Column(name = "guestid")
    private String guestId;

    private double qty;

    private double price;

    @Column(name = "deptid")
    private int deptId;

    @Column(name = "twodeptid")
    private int twoDeptId;

    private String spec;

    @Column(name = "opknum")
    private int oPKNum;

    @Column(name = "opkname")
    private String oPKName;

    @Column(name = "opkspec")
    private String oPKSpec;

    private boolean favorited;

    public int getModelId() {return id;}

    public boolean getFavorited() {
        return favorited;
    }

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

    public int getTwoDeptId() {return twoDeptId;}

    public double getQty() {return qty;}

}
