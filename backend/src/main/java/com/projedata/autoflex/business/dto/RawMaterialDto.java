package com.projedata.autoflex.business.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record RawMaterialDto() {

    public record RawMaterialRequest(
            @NotBlank(message = "Name cannot be blank")
            String name,

            @NotNull(message = "Stock quantity cannot be null")
            @PositiveOrZero(message = "Stock quantity must be zero or positive")
            Integer stockQuantity
    ) {}

    public record RawMaterialResponse(
            Long id,
            String name,
            Integer stockQuantity
    ) {}
}