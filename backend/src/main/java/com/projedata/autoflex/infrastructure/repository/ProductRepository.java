package com.projedata.autoflex.infrastructure.repository;

import com.projedata.autoflex.infrastructure.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Fetches all products with their compositions and associated raw materials in a single query
     * to avoid the N+1 problem. The results are ordered by price in descending order.
     * @return A list of products, optimized for the production suggestion calculation.
     */
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.composition c LEFT JOIN FETCH c.rawMaterial ORDER BY p.price DESC")
    List<Product> findAllWithCompositionAndRawMaterialOrderByPriceDesc();
}