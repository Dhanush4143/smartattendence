package com.university.antigravity.controller.payload;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
