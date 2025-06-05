package com.lightsupport.backend.dto.requests;

public class LoginRequestDto {
    private String contact;
    private String password;

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
