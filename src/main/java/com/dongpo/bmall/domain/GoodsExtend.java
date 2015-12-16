package com.dongpo.bmall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by AlexBob on 2015/12/16.
 */
@Entity(name = "goodsextend")
public class GoodsExtend {

    @Id
    private int id;

    @Column(name = "goodsid")
    private int goodsId;

    @Column(name = "imgid")
    private int imgId;

    private String url;

    public int getId() {
        return id;
    }

    public int getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(int goodsId) {
        this.goodsId = goodsId;
    }

    public int getImgId() {
        return imgId;
    }

    public void setImgId(int imgId) {
        this.imgId = imgId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
