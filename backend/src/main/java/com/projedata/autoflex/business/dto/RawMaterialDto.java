package com.projedata.autoflex.business.dto;

public record RawMaterialDto() {

    public record RawMaterialRequest(
            String name,
            Integer stockQuantity
    ) {}

    public record RawMaterialResponse(
            Long id,
            String name,
            Integer stockQuantity
    ) {}
}