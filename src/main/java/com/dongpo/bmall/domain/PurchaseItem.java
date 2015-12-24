package com.dongpo.bmall.domain;

import javax.persistence.*;

/**
 * Created by AlexBob on 2015/12/24.
 */
@Entity(name = "mhwholepurchaseitem0")
public class PurchaseItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "sheetid")
    private String sheetId;

    @Column(name = "shopid")
    private String shopId="1001";

    @Column(name = "guestid")
    private String guestId;

    @Column(name = "goodsid")
    private int goodsId;

    private double qty;

    private double price;

    @Column(name = "sumprice")
    private double sumPrice;

    @Column(name = "pkname")
    private String unitName;

    public int getId() {
        return id;
    }



    public String getSheetId() {
        return sheetId;
    }

    public void setSheetId(String sheetId) {
        this.sheetId = sheetId;
    }

    public double getQty() {
        return qty;
    }

    public void setQty(double qty) {
        this.qty = qty;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getGuestId() {
        return guestId;
    }

    public void setGuestId(String guestId) {
        this.guestId = guestId;
    }

    public String getShopId() {
        return shopId;
    }

    public void setShopId(String shopId) {
        this.shopId = shopId;
    }

    public double getSumPrice() {
        return sumPrice;
    }

    public void setSumPrice(double sumPrice) {
        this.sumPrice = sumPrice;
    }

    public int getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(int goodsId) {
        this.goodsId = goodsId;
    }
}
