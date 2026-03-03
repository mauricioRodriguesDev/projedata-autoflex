package com.projedata.autoflex.business.dto;

import java.math.BigDecimal;
import java.util.Set;

public record ProductDto() {

    public record Request(
            String name,
            BigDecimal price,
            Set<CompositionDto.Request> composition
    ) {}

    public record Response(
            Long id,
            String name,
            BigDecimal price,
            Set<CompositionDto.Response> composition
    ) {}
}