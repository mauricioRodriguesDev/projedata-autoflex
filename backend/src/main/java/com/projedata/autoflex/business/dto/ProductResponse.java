package com.projedata.autoflex.business.dto;

import java.math.BigDecimal;
import java.util.Set;

public record ProductResponse(
        Long id,
        String name,
        BigDecimal price,
        Set<CompositionItemResponse> composition
) {
    public record CompositionItemResponse(
            Long rawMaterialId,
            String rawMaterialName,
            Integer quantityNeeded
    ) {}
}