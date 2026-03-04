package com.projedata.autoflex.infrastructure.repository;

import com.projedata.autoflex.infrastructure.entity.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {
}