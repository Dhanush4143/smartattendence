package com.university.antigravity.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "modules")
public class Module {
    @Id
    private String id;

    private String name;

    private String description;

    @DBRef
    private User teacher;
}
