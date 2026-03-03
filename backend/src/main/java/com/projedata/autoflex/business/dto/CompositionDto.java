package com.projedata.autoflex.business.dto;

public record CompositionDto() {

    public record Request(
            Long rawMaterialId,
            Integer quantityNeeded
    ) {}

    public record Response(
            Long rawMaterialId,
            String rawMaterialName,
            Integer quantityNeeded
    ) {}
}