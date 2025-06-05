package com.lightsupport.backend.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {
    ObjectMapper mapper = new ObjectMapper();

    public void printOut(Object obj) throws JsonProcessingException {
        System.out.println(this.mapper.writeValueAsString(obj));
    }
}
