package com.dongpo.bmall.domain;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Set;

/**
 * Created by AlexBob on 2015/12/24.
 */
@Entity(name = "mhwholepurchase0")
public class Purchase {

    @Id
    @Column(name = "sheetid")
    private String sheetId;

    private int flag=1;

    private String editor;

    private Timestamp editdate = Timestamp.from(Instant.now());

    private String operator;

    private String checker;

    private Timestamp checkdate= Timestamp.from(Instant.now());

    @Column(name = "ordphdate")
    private int ordphdate=7;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name ="sheetid")
    private Set<PurchaseItem> itemSet;

    @Column(name = "paymodeid")
    private String paymodeId;

    public String getSheetId() {
        return sheetId;
    }

    public void setSheetId(String sheetId) {
        this.sheetId = sheetId;
    }

    public String getEditor() {
        return editor;
    }

    public void setEditor(String editor) {
        this.editor = editor;
    }

    public Timestamp getEditdate() {
        return editdate;
    }

    public void setEditdate(Timestamp editdate) {
        this.editdate = editdate;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getChecker() {
        return checker;
    }

    public void setChecker(String checker) {
        this.checker = checker;
    }

    public Timestamp getCheckdate() {
        return checkdate;
    }

    public void setCheckdate(Timestamp checkdate) {
        this.checkdate = checkdate;
    }

    public int getOrdphdate() {
        return ordphdate;
    }

    public void setOrdphdate(int ordphdate) {
        this.ordphdate = ordphdate;
    }

    public String getPaymodeId() {
        return paymodeId;
    }

    public void setPaymodeId(String paymodeId) {
        this.paymodeId = paymodeId;
    }

    public int getFlag() {
        return flag;
    }

    public void setFlag(int flag) {
        this.flag = flag;
    }

    public Set<PurchaseItem> getItemSet() {
        return itemSet;
    }

    public void setItemSet(Set<PurchaseItem> itemSet) {
        this.itemSet = itemSet;
    }
}
