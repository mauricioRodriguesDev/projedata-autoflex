package com.projedata.autoflex.infrastructure.repository;

import com.projedata.autoflex.infrastructure.entity.ProductComposition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCompositionRepository extends JpaRepository<ProductComposition, Long> {

    /**
     * Checks if any product composition entry uses the specified raw material.
     * @param rawMaterialId The ID of the raw material to check.
     * @return true if the raw material is in use, false otherwise.
     */
    boolean existsByRawMaterialId(Long rawMaterialId);
}
