package com.projedata.autoflex.infrastructure.repository;

import com.projedata.autoflex.infrastructure.entity.ProductComposition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCompositionRepository extends JpaRepository<ProductComposition, Long> {
}