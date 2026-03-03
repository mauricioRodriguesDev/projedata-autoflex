package com.projedata.autoflex.business.service;

import com.projedata.autoflex.business.dto.ProductDto;
import com.projedata.autoflex.business.dto.ProductionSuggestionDto;
import com.projedata.autoflex.business.mapper.ProductMapper;
import com.projedata.autoflex.infrastructure.entity.Product;
import com.projedata.autoflex.infrastructure.entity.RawMaterial;
import com.projedata.autoflex.infrastructure.exception.ResourceNotFoundException;
import com.projedata.autoflex.infrastructure.repository.ProductRepository;
import com.projedata.autoflex.infrastructure.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductMapper productMapper;

    @Transactional(readOnly = true)
    public ProductionSuggestionDto.Response getProductionSuggestion() {
        // 1. Load all raw material stock into a mutable map for quick access and modification.
        Map<Long, Integer> availableStock = rawMaterialRepository.findAll().stream()
                .collect(Collectors.toMap(RawMaterial::getId, RawMaterial::getStockQuantity));

        // 2. Fetch all products, pre-ordered by price (desc) and with compositions pre-loaded.
        List<Product> productsByValue = productRepository.findAllWithCompositionAndRawMaterialOrderByPriceDesc();

        List<ProductionSuggestionDto.SuggestionItem> suggestions = new ArrayList<>();
        BigDecimal totalValue = BigDecimal.ZERO;

        // 3. Iterate through products, from most to least valuable.
        for (Product product : productsByValue) {
            if (product.getComposition() == null || product.getComposition().isEmpty()) {
                continue; // Cannot produce a product with no composition.
            }

            // 4. For each product, determine the maximum number of units we can produce.
            // This is limited by the single raw material that is the biggest bottleneck.
            int maxProducible = product.getComposition().stream()
                    .mapToInt(comp -> {
                        int stock = availableStock.getOrDefault(comp.getRawMaterial().getId(), 0);
                        int needed = comp.getQuantityNeeded();
                        return (needed > 0) ? stock / needed : Integer.MAX_VALUE;
                    })
                    .min()
                    .orElse(0);

            // 5. If we can produce at least one unit...
            if (maxProducible > 0) {
                // a. Create a suggestion item for the response.
                BigDecimal itemTotalValue = product.getPrice().multiply(BigDecimal.valueOf(maxProducible));
                suggestions.add(new ProductionSuggestionDto.SuggestionItem(
                        product.getId(),
                        product.getName(),
                        maxProducible,
                        product.getPrice(),
                        itemTotalValue
                ));

                // b. Update the total value of the suggestion.
                totalValue = totalValue.add(itemTotalValue);

                // c. "Consume" the virtual stock for the next iteration.
                product.getComposition().forEach(comp -> {
                    long rawMaterialId = comp.getRawMaterial().getId();
                    int stock = availableStock.get(rawMaterialId);
                    int consumed = comp.getQuantityNeeded() * maxProducible;
                    availableStock.put(rawMaterialId, stock - consumed);
                });
            }
        }

        return new ProductionSuggestionDto.Response(suggestions, totalValue);
    }

    // ... existing CRUD methods ...
    @Transactional
    public ProductDto.Response create(ProductDto.Request request) {
        Product product = productMapper.toEntity(request);
        Product savedProduct = productRepository.save(product);
        return productMapper.toResponse(savedProduct);
    }

    @Transactional(readOnly = true)
    public List<ProductDto.Response> findAll() {
        return productRepository.findAll().stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDto.Response findById(Long id) {
        return productRepository.findById(id)
                .map(productMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Transactional
    public ProductDto.Response update(Long id, ProductDto.Request request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        productMapper.updateFromRequest(request, product);

        Product updatedProduct = productRepository.save(product);
        return productMapper.toResponse(updatedProduct);
    }

    @Transactional
    public void delete(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        productRepository.delete(product);
    }
}