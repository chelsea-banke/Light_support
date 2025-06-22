package com.lightsupport.backend.utils.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SessionRegistry {

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    public void register(WebSocketSession session) {
        String faultId = extractFaultId(session);
        if (faultId != null) {
            sessions.put(faultId, session);
        }
    }

    public void unregister(WebSocketSession session) {
        sessions.values().removeIf(s -> s.getId().equals(session.getId()));
    }

    public WebSocketSession getSession(String faultId) {
        return sessions.get(faultId);
    }

    private String extractFaultId(WebSocketSession session) {
        try {
            String query = session.getUri().getQuery(); // e.g., faultId=abc123
            if (query != null && query.startsWith("faultId=")) {
                return query.split("=")[1];
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
