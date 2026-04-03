package com.university.antigravity.controller.payload;

import java.util.List;
import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String id;
    private String name;
    private String email;
    private List<String> roles;

    public JwtResponse(String token, String id, String name, String email, List<String> roles) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = roles;
    }
}
