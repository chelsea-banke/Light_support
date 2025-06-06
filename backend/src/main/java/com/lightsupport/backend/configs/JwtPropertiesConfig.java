package com.lightsupport.backend.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "application.security.jwt")
public class JwtPropertiesConfig {
    private String secretKey;
    private long AccessTokenValidity;
    private long RefreshTokenValidity;

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public long getAccessTokenValidity() {
        return AccessTokenValidity;
    }

    public void setAccessTokenValidity(long accessTokenValidity) {
        AccessTokenValidity = accessTokenValidity;
    }

    public long getRefreshTokenValidity() {
        return RefreshTokenValidity;
    }

    public void setRefreshTokenValidity(long refreshTokenValidity) {
        RefreshTokenValidity = refreshTokenValidity;
    }
}
