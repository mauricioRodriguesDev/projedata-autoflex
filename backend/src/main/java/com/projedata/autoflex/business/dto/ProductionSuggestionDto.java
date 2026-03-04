package com.projedata.autoflex.business.dto;

import java.math.BigDecimal;
import java.util.List;

public record ProductionSuggestionDto() {

    public record SuggestionItem(
            Long productId,
            String productName,
            Integer quantityProducible,
            BigDecimal unitPrice,
            BigDecimal totalValue
    ) {}

    public record Response(
            List<SuggestionItem> suggestedProducts,
            BigDecimal totalObtainableValue
    ) {}
}