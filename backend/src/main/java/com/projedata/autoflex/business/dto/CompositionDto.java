package com.projedata.autoflex.business.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CompositionDto() {

    public record Request(
            @NotNull(message = "Raw material ID cannot be null")
            @Positive(message = "Raw material ID must be positive")
            Long rawMaterialId,

            @NotNull(message = "Quantity needed cannot be null")
            @Positive(message = "Quantity needed must be positive")
            Integer quantityNeeded
    ) {}

    public record Response(
            Long rawMaterialId,
            String rawMaterialName,
            Integer quantityNeeded
    ) {}
}