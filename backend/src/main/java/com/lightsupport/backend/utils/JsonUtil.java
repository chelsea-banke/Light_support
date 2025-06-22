package com.lightsupport.backend.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class JsonUtil {
    ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

    public void printOut(Object obj) throws JsonProcessingException {
        System.out.println(this.mapper.writeValueAsString(obj));
    }
}
