package com.aaa.akr.repository;

import com.aaa.akr.domain.UserExtras;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserExtras entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtrasRepository extends JpaRepository<UserExtras,Long> {
    
}
