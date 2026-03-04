package com.projedata.autoflex.business.dto;

public record CompositionItemResponse(
        Long rawMaterialId,
        String rawMaterialName,
        Integer quantityNeeded
) {
}