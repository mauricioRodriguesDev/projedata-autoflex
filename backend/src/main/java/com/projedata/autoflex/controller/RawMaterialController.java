package com.projedata.autoflex.controller;

import com.projedata.autoflex.business.service.RawMaterialService;
import com.projedata.autoflex.business.dto.RawMaterialDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/raw-materials")
@RequiredArgsConstructor
public class RawMaterialController {

    private final RawMaterialService rawMaterialService;

    @PostMapping
    public ResponseEntity<RawMaterialDto.RawMaterialResponse> createRawMaterial(@RequestBody RawMaterialDto.RawMaterialRequest request) {
        RawMaterialDto.RawMaterialResponse createdRawMaterial = rawMaterialService.create(request);
        return ResponseEntity.created(URI.create("/api/raw-materials/" + createdRawMaterial.id())).body(createdRawMaterial);
    }

    @GetMapping
    public ResponseEntity<List<RawMaterialDto.RawMaterialResponse>> findAllRawMaterials() {
        List<RawMaterialDto.RawMaterialResponse> rawMaterials = rawMaterialService.findAll();
        return ResponseEntity.ok(rawMaterials);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RawMaterialDto.RawMaterialResponse> findRawMaterialById(@PathVariable Long id) {
        RawMaterialDto.RawMaterialResponse rawMaterial = rawMaterialService.findById(id);
        return ResponseEntity.ok(rawMaterial);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RawMaterialDto.RawMaterialResponse> updateRawMaterial(@PathVariable Long id, @RequestBody RawMaterialDto.RawMaterialRequest request) {
        RawMaterialDto.RawMaterialResponse updatedRawMaterial = rawMaterialService.update(id, request);
        return ResponseEntity.ok(updatedRawMaterial);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRawMaterial(@PathVariable Long id) {
        rawMaterialService.delete(id);
        return ResponseEntity.noContent().build();
    }
}