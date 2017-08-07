package com.aaa.akr.repository;

import com.aaa.akr.domain.DeliveryTrack;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DeliveryTrack entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryTrackRepository extends JpaRepository<DeliveryTrack,Long> {
    
}
