package com.university.antigravity.controller.payload;

import lombok.Data;

@Data
public class AttendanceRequest {
    private String moduleId;
    private String date; // YYYY-MM-DD
    private String status; // PRESENT, ABSENT, EXCUSED
}
