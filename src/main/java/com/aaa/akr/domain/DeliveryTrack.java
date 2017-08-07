package com.aaa.akr.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.aaa.akr.domain.enumeration.DeliveryStatus;

/**
 * A DeliveryTrack.
 */
@Entity
@Table(name = "delivery_track")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DeliveryTrack implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "estimated_time")
    private ZonedDateTime estimatedTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private DeliveryStatus status;

    @OneToOne
    @JoinColumn(unique = true)
    private Bill bill;

    @OneToOne(mappedBy = "deliveryTrack")
    @JsonIgnore
    private UserExtras userExtras;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getEstimatedTime() {
        return estimatedTime;
    }

    public DeliveryTrack estimatedTime(ZonedDateTime estimatedTime) {
        this.estimatedTime = estimatedTime;
        return this;
    }

    public void setEstimatedTime(ZonedDateTime estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public DeliveryStatus getStatus() {
        return status;
    }

    public DeliveryTrack status(DeliveryStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(DeliveryStatus status) {
        this.status = status;
    }

    public Bill getBill() {
        return bill;
    }

    public DeliveryTrack bill(Bill bill) {
        this.bill = bill;
        return this;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public UserExtras getUserExtras() {
        return userExtras;
    }

    public DeliveryTrack userExtras(UserExtras userExtras) {
        this.userExtras = userExtras;
        return this;
    }

    public void setUserExtras(UserExtras userExtras) {
        this.userExtras = userExtras;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DeliveryTrack deliveryTrack = (DeliveryTrack) o;
        if (deliveryTrack.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), deliveryTrack.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DeliveryTrack{" +
            "id=" + getId() +
            ", estimatedTime='" + getEstimatedTime() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
