package com.university.antigravity.controller.payload;

import lombok.Data;

@Data
public class CreateModuleRequest {
    private String name;
    private String description;
}
