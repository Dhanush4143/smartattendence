package com.university.antigravity.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "reports")
public class Report {
    @Id
    private String id;

    private String data; // CSV or JSON string of the report

    private LocalDateTime dateGenerated;

    @DBRef
    private User generatedBy;
}
