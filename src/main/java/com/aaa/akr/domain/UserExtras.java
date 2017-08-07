package com.aaa.akr.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A UserExtras.
 */
@Entity
@Table(name = "user_extras")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserExtras implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private String telephone;

    @OneToOne
    @JoinColumn(unique = true)
    private DeliveryTrack deliveryTrack;

    @OneToMany(mappedBy = "userExtras")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Address> addresses = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTelephone() {
        return telephone;
    }

    public UserExtras telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public DeliveryTrack getDeliveryTrack() {
        return deliveryTrack;
    }

    public UserExtras deliveryTrack(DeliveryTrack deliveryTrack) {
        this.deliveryTrack = deliveryTrack;
        return this;
    }

    public void setDeliveryTrack(DeliveryTrack deliveryTrack) {
        this.deliveryTrack = deliveryTrack;
    }

    public Set<Address> getAddresses() {
        return addresses;
    }

    public UserExtras addresses(Set<Address> addresses) {
        this.addresses = addresses;
        return this;
    }

    public UserExtras addAddress(Address address) {
        this.addresses.add(address);
        address.setUserExtras(this);
        return this;
    }

    public UserExtras removeAddress(Address address) {
        this.addresses.remove(address);
        address.setUserExtras(null);
        return this;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserExtras userExtras = (UserExtras) o;
        if (userExtras.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userExtras.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserExtras{" +
            "id=" + getId() +
            ", telephone='" + getTelephone() + "'" +
            "}";
    }
}
