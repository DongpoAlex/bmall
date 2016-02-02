package com.dongpo.bmall.domain;

import javax.persistence.*;

/**
 * Created by AlexBob on 2016/1/27.
 */
@Entity
@Table(name = "guest_goods")
public class FavoritesGoods {

    @Id
    @GeneratedValue
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

    public int getModelId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getDeptId() {
        return deptId;
    }

    public void setDeptId(int deptId) {
        this.deptId = deptId;
    }

    public int getTwoDeptId() {
        return twoDeptId;
    }

    public void setTwoDeptId(int twoDeptId) {
        this.twoDeptId = twoDeptId;
    }

    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    public int getoPKNum() {
        return oPKNum;
    }

    public void setoPKNum(int oPKNum) {
        this.oPKNum = oPKNum;
    }

    public String getoPKName() {
        return oPKName;
    }

    public void setoPKName(String oPKName) {
        this.oPKName = oPKName;
    }

    public String getoPKSpec() {
        return oPKSpec;
    }

    public void setoPKSpec(String oPKSpec) {
        this.oPKSpec = oPKSpec;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(int goodsId) {
        this.goodsId = goodsId;
    }

    public String getGuestId() {
        return guestId;
    }

    public void setGuestId(String guestId) {
        this.guestId = guestId;
    }

    public double getQty() {
        return qty;
    }

    public void setQty(double qty) {
        this.qty = qty;
    }

    public boolean isFavorited() {
        return favorited;
    }

    public void setFavorited(boolean favorited) {
        this.favorited = favorited;
    }
}
