package com.lightsupport.backend.services;

import com.lightsupport.backend.dto.AssetDto;
import com.lightsupport.backend.dto.response.FaultResponseDto;
import com.lightsupport.backend.models.Asset;
import com.lightsupport.backend.repositories.AssetRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetService {

    private final AssetRepo assetRepo;
    private final ModelMapper modelMapper;

    @Autowired
    public AssetService(AssetRepo assetRepo, ModelMapper modelMapper) {
        this.assetRepo = assetRepo;
        this.modelMapper = modelMapper;
    }

    public AssetDto createAsset(AssetDto assetDto){
        return modelMapper.map(assetRepo.save(
                modelMapper.map(assetDto, Asset.class)), AssetDto.class);
    }

    public List<AssetDto> getAssets(){
        List<AssetDto> AssetDtos =  assetRepo.findAll().
                stream().map(asset ->
                        modelMapper.map(asset, AssetDto.class))
                .toList();
        return AssetDtos;
    }
}
