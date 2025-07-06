package com.lightsupport.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lightsupport.backend.dto.AssetDto;
import com.lightsupport.backend.models.Asset;
import com.lightsupport.backend.services.AssetService;
import com.lightsupport.backend.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/asset")
public class AssetController {

    private final AssetService assetService;

    @Autowired
    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAsset(@RequestBody AssetDto assetDto){
        return ResponseEntity.ok(assetService.createAsset(assetDto));
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAssets(){
        return ResponseEntity.ok(assetService.getAssets());
    }
}
