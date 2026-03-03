package com.projedata.autoflex.business.mapper;

import com.projedata.autoflex.business.dto.RawMaterialDto;
import com.projedata.autoflex.infrastructure.entity.RawMaterial;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RawMaterialMapper {

    @Mapping(target = "id", ignore = true)
    RawMaterial toEntity(RawMaterialDto.RawMaterialRequest request);

    RawMaterialDto.RawMaterialResponse toResponse(RawMaterial rawMaterial);
}