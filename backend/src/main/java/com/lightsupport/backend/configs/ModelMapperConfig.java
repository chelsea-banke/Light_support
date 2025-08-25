package com.lightsupport.backend.configs;

import com.lightsupport.backend.dto.FaultDto;
import com.lightsupport.backend.dto.FaultUpdateDto;
import com.lightsupport.backend.dto.MessageDto;
import com.lightsupport.backend.dto.TicketDto;
import com.lightsupport.backend.dto.requests.CreateTicketDto;
import com.lightsupport.backend.dto.requests.RegisterFieldTechRequestDto;
import com.lightsupport.backend.dto.response.LoginResponseDto;
import com.lightsupport.backend.models.*;
import com.lightsupport.backend.models.types.MessageType;
import com.lightsupport.backend.models.types.Role;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Define the converter
        Converter<User, String> identifierConverter = ctx -> {
            User src = ctx.getSource();
            if (src.getRole() == Role.FIELD_TECH) {
                return src.getId() != null ? String.valueOf(src.getId()) : null;
            } else {
                return src.getContact();
            }
        };

        modelMapper.addMappings(new PropertyMap<Message, MessageDto>() {
            @Override
            protected void configure() {
                map().setFaultId(source.getIdFault().getId());
                map().setContent(source.getContent());
            }
        });

        modelMapper.addMappings(new PropertyMap<RegisterFieldTechRequestDto, User>() {
            @Override
            protected void configure() {
                map().setId(source.getMatricule());
            }
        });

        // Apply the converter in a mapping
        modelMapper.typeMap(User.class, LoginResponseDto.class)
                .addMappings(mapper ->
                        mapper.using(identifierConverter)
                                .map(src -> src, LoginResponseDto::setIdentifier)
                );

        modelMapper.addMappings(new PropertyMap<Ticket, TicketDto>() {
            @Override
            protected void configure() {
                map().setFieldSupportId(source.getIdFieldSupport().getId());
                map().setFaultId(source.getIdFault().getId());
                map().setAssetId(source.getIdAsset().getId());
            }
        });

        modelMapper.addMappings(new PropertyMap<Fault, FaultDto>() {
            @Override
            protected void configure() {
                map().setClientId(source.getIdClient().getContact());
                map().setDeskSupportId(source.getIdDeskSupport().getId());
            }
        });

        modelMapper.addMappings(new PropertyMap<CreateTicketDto, FaultUpdateDto>() {
            @Override
            protected void configure() {
                map().setId(source.getFaultId());
            }
        });

        return modelMapper;
    }
}