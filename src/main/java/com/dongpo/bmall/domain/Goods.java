package com.dongpo.bmall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

/**
 * Created by AlexBob on 2015/12/16.
 */
@Entity
public class Goods {

    @Id
    @Column(name = "goodsID")
    private int goodsId;

    private String name;

    @Column(name = "BarcodeID")
    private String barcode;

    @Column(name = "unitname")
    private String unitName;

    @OneToMany(mappedBy = "goodsId")
    private Set<GoodsExtend> extendSet;

    public int getGoodsId() {
        return goodsId;
    }

    public int getId() {return goodsId;}

    public void setGoodsId(int goodsId) {
        this.goodsId = goodsId;
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

    public Set<GoodsExtend> getExtendSet() {
        return extendSet;
    }

    public void setExtendSet(Set<GoodsExtend> extendSet) {
        this.extendSet = extendSet;
    }
}
