package com.projedata.autoflex.business.mapper;

import com.projedata.autoflex.business.dto.CompositionDto;
import com.projedata.autoflex.business.dto.ProductDto;
import com.projedata.autoflex.infrastructure.entity.Product;
import com.projedata.autoflex.infrastructure.entity.ProductComposition;
import com.projedata.autoflex.infrastructure.entity.RawMaterial;
import com.projedata.autoflex.infrastructure.exception.ResourceNotFoundException;
import com.projedata.autoflex.infrastructure.repository.RawMaterialRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public abstract class ProductMapper {

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "composition", source = "request.composition")
    public abstract Product toEntity(ProductDto.Request request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "composition", source = "request.composition")
    public abstract void updateFromRequest(ProductDto.Request request, @MappingTarget Product product);

    public abstract ProductDto.Response toResponse(Product product);

    @Mapping(source = "rawMaterial.id", target = "rawMaterialId")
    @Mapping(source = "rawMaterial.name", target = "rawMaterialName")
    public abstract CompositionDto.Response toCompositionResponse(ProductComposition composition);

    public Set<ProductComposition> toCompositionSet(Set<CompositionDto.Request> compositionRequest) {
        return Optional.ofNullable(compositionRequest)
                .orElse(Collections.emptySet())
                .stream()
                .map(this::toProductComposition)
                .collect(Collectors.toSet());
    }

    public ProductComposition toProductComposition(CompositionDto.Request compRequest) {
        if (compRequest == null) {
            return null;
        }
        RawMaterial rawMaterial = rawMaterialRepository.findById(compRequest.rawMaterialId())
                .orElseThrow(() -> new ResourceNotFoundException("RawMaterial not found with id: " + compRequest.rawMaterialId()));

        ProductComposition productComposition = new ProductComposition();
        productComposition.setRawMaterial(rawMaterial);
        productComposition.setQuantityNeeded(compRequest.quantityNeeded());
        return productComposition;
    }

    @BeforeMapping
    protected void beforeUpdateFromRequest(ProductDto.Request request, @MappingTarget Product product) {
        // Clear the collection before mapping to handle updates correctly
        product.getComposition().clear();
    }

    @AfterMapping
    protected void afterMapping(@MappingTarget Product product) {
        // Ensure the back-reference is set
        if (product.getComposition() != null) {
            product.getComposition().forEach(c -> c.setProduct(product));
        }
    }
}