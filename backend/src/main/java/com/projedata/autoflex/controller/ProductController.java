package com.projedata.autoflex.controller;

import com.projedata.autoflex.business.dto.ProductDto;
import com.projedata.autoflex.business.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductDto.Response> createProduct(@Valid @RequestBody ProductDto.Request request) {
        ProductDto.Response createdProduct = productService.create(request);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdProduct.id()).toUri();
        return ResponseEntity.created(uri).body(createdProduct);
    }

    @GetMapping
    public ResponseEntity<List<ProductDto.Response>> findAllProducts() {
        List<ProductDto.Response> products = productService.findAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto.Response> findProductById(@PathVariable Long id) {
        ProductDto.Response product = productService.findById(id);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto.Response> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductDto.Request request) {
        ProductDto.Response updatedProduct = productService.update(id, request);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}