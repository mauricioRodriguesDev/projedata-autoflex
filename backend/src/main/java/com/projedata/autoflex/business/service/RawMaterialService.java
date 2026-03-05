package com.projedata.autoflex.business.service;

import com.projedata.autoflex.business.dto.RawMaterialDto;
import com.projedata.autoflex.business.mapper.RawMaterialMapper;
import com.projedata.autoflex.infrastructure.entity.RawMaterial;
import com.projedata.autoflex.infrastructure.exception.ResourceInUseException;
import com.projedata.autoflex.infrastructure.exception.ResourceNotFoundException;
import com.projedata.autoflex.infrastructure.repository.ProductCompositionRepository;
import com.projedata.autoflex.infrastructure.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RawMaterialService {

    private final RawMaterialRepository rawMaterialRepository;
    private final ProductCompositionRepository productCompositionRepository;
    private final RawMaterialMapper rawMaterialMapper;

    // ... outros métodos permanecem os mesmos ...

    @Transactional
    public RawMaterialDto.RawMaterialResponse create(RawMaterialDto.RawMaterialRequest request) {
        RawMaterial rawMaterial = rawMaterialMapper.toEntity(request);
        RawMaterial savedRawMaterial = rawMaterialRepository.save(rawMaterial);
        return rawMaterialMapper.toResponse(savedRawMaterial);
    }

    @Transactional(readOnly = true)
    public List<RawMaterialDto.RawMaterialResponse> findAll() {
        return rawMaterialRepository.findAll().stream()
                .map(rawMaterialMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RawMaterialDto.RawMaterialResponse findById(Long id) {
        return rawMaterialRepository.findById(id)
                .map(rawMaterialMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("RawMaterial not found with id: " + id));
    }

    @Transactional
    public RawMaterialDto.RawMaterialResponse update(Long id, RawMaterialDto.RawMaterialRequest request) {
        RawMaterial rawMaterial = rawMaterialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RawMaterial not found with id: " + id));

        rawMaterial.setName(request.name());
        rawMaterial.setStockQuantity(request.stockQuantity());

        RawMaterial updatedRawMaterial = rawMaterialRepository.save(rawMaterial);
        return rawMaterialMapper.toResponse(updatedRawMaterial);
    }

    @Transactional
    public void delete(Long id) {
        RawMaterial rawMaterial = rawMaterialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RawMaterial not found with id: " + id));

        if (productCompositionRepository.existsByRawMaterialId(id)) {
            throw new ResourceInUseException("Cannot delete RawMaterial with id " + id + " because it is being used by one or more products.");
        }

        rawMaterialRepository.delete(rawMaterial);
    }
}
