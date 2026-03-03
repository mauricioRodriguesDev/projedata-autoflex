package com.projedata.autoflex.business.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.Set;

public record ProductDto() {

    public record Request(
            @NotBlank(message = "Name cannot be blank")
            String name,

            @NotNull(message = "Price cannot be null")
            @Positive(message = "Price must be positive")
            BigDecimal price,

            @Valid
            @Size(min = 1, message = "Composition must contain at least one item")
            Set<CompositionDto.Request> composition
    ) {}

    public record Response(
            Long id,
            String name,
            BigDecimal price,
            Set<CompositionDto.Response> composition
    ) {}
}