package com.projedata.autoflex.business.mapper;

import com.projedata.autoflex.business.dto.CompositionDto;
import com.projedata.autoflex.business.dto.ProductDto;
import com.projedata.autoflex.infrastructure.entity.Product;
import com.projedata.autoflex.infrastructure.entity.ProductComposition;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "composition", ignore = true)
    Product toEntity(ProductDto.Request request);

    ProductDto.Response toResponse(Product product);

    @Mapping(source = "rawMaterial.id", target = "rawMaterialId")
    @Mapping(source = "rawMaterial.name", target = "rawMaterialName")
    CompositionDto.Response toCompositionResponse(ProductComposition composition);
}