package com.lightsupport.backend.configs;

import com.lightsupport.backend.dto.MessageDto;
import com.lightsupport.backend.dto.requests.RegisterFieldTechRequestDto;
import com.lightsupport.backend.dto.response.LoginResponseDto;
import com.lightsupport.backend.models.Answer;
import com.lightsupport.backend.models.Message;
import com.lightsupport.backend.models.User;
import com.lightsupport.backend.models.enums.Role;
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
                map().setChatId(source.getIdChatSession().getId());
                map().setContent(source.getMessage());
                map().setType("sent");
            }
        });

        modelMapper.addMappings(new PropertyMap<Answer, MessageDto>() {
            @Override
            protected void configure() {
                map().setContent(source.getAnswer());
                map().setCreatedDate(source.getSendDate());
                map().setType("received");
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

        return modelMapper;
    }
}