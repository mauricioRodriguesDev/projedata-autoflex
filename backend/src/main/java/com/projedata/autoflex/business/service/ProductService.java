package com.projedata.autoflex.business.service;

import com.projedata.autoflex.business.dto.ProductDto;
import com.projedata.autoflex.business.mapper.ProductMapper;
import com.projedata.autoflex.infrastructure.entity.Product;
import com.projedata.autoflex.infrastructure.entity.ProductComposition;
import com.projedata.autoflex.infrastructure.entity.RawMaterial;
import com.projedata.autoflex.infrastructure.repository.ProductRepository;
import com.projedata.autoflex.infrastructure.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductMapper productMapper;

    @Transactional
    public ProductDto.Response create(ProductDto.Request request) {
        Product product = productMapper.toEntity(request);

        if (request.composition() != null && !request.composition().isEmpty()) {
            product.setComposition(buildComposition(product, request.composition()));
        }

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
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id)); // TODO: Custom exception
    }

    @Transactional
    public ProductDto.Response update(Long id, ProductDto.Request request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        product.setName(request.name());
        product.setPrice(request.price());

        product.getComposition().clear();
        if (request.composition() != null && !request.composition().isEmpty()) {
            product.getComposition().addAll(buildComposition(product, request.composition()));
        }

        Product updatedProduct = productRepository.save(product);
        return productMapper.toResponse(updatedProduct);
    }

    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id); // TODO: Custom exception
        }
        productRepository.deleteById(id);
    }

    private Set<ProductComposition> buildComposition(Product product, Set<ProductDto.CompositionDto.Request> compositionRequest) {
        return compositionRequest.stream()
                .map(compRequest -> {
                    RawMaterial rawMaterial = rawMaterialRepository.findById(compRequest.rawMaterialId())
                            .orElseThrow(() -> new RuntimeException("RawMaterial not found with id: " + compRequest.rawMaterialId()));

                    ProductComposition productComposition = new ProductComposition();
                    productComposition.setProduct(product);
                    productComposition.setRawMaterial(rawMaterial);
                    productComposition.setQuantityNeeded(compRequest.quantityNeeded());
                    return productComposition;
                })
                .collect(Collectors.toSet());
    }
}