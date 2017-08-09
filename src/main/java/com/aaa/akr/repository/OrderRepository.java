package com.aaa.akr.repository;

import com.aaa.akr.domain.Order;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Order entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    
    @Query("select distinct jhi_order from Order jhi_order left join fetch jhi_order.products")
    List<Order> findAllWithEagerRelationships();

    @Query("select jhi_order from Order jhi_order left join fetch jhi_order.products where jhi_order.id =:id")
    Order findOneWithEagerRelationships(@Param("id") Long id);
    
}
