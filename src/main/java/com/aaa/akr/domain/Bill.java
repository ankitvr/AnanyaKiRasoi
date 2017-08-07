package com.aaa.akr.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Bill.
 */
@Entity
@Table(name = "bill")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bill_time")
    private ZonedDateTime billTime;

    @Column(name = "amount")
    private Float amount;

    @Column(name = "discount")
    private Float discount;

    @OneToOne
    @JoinColumn(unique = true)
    private Order order;

    @OneToOne(mappedBy = "bill")
    @JsonIgnore
    private DeliveryTrack deliveryTrack;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getBillTime() {
        return billTime;
    }

    public Bill billTime(ZonedDateTime billTime) {
        this.billTime = billTime;
        return this;
    }

    public void setBillTime(ZonedDateTime billTime) {
        this.billTime = billTime;
    }

    public Float getAmount() {
        return amount;
    }

    public Bill amount(Float amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Float getDiscount() {
        return discount;
    }

    public Bill discount(Float discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    public Order getOrder() {
        return order;
    }

    public Bill order(Order order) {
        this.order = order;
        return this;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public DeliveryTrack getDeliveryTrack() {
        return deliveryTrack;
    }

    public Bill deliveryTrack(DeliveryTrack deliveryTrack) {
        this.deliveryTrack = deliveryTrack;
        return this;
    }

    public void setDeliveryTrack(DeliveryTrack deliveryTrack) {
        this.deliveryTrack = deliveryTrack;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Bill bill = (Bill) o;
        if (bill.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bill.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bill{" +
            "id=" + getId() +
            ", billTime='" + getBillTime() + "'" +
            ", amount='" + getAmount() + "'" +
            ", discount='" + getDiscount() + "'" +
            "}";
    }
}
