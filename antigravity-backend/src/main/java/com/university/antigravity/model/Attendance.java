package com.university.antigravity.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document(collection = "attendance")
public class Attendance {
    @Id
    private String id;

    @DBRef
    private Module module;

    @DBRef
    private User user;

    private LocalDate date;
    
    private Integer period;

    private AttendanceStatus status;
}
