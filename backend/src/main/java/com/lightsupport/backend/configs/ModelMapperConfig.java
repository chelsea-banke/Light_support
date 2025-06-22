package com.lightsupport.backend.configs;

import com.lightsupport.backend.dto.MessageDto;
import com.lightsupport.backend.models.Answer;
import com.lightsupport.backend.models.Message;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

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

        return modelMapper;
    }
}