package com.university.antigravity.controller.payload;

import lombok.Data;
import java.util.List;

@Data
public class BulkAttendanceRequest {
    private String moduleId;
    private String date; // YYYY-MM-DD
    private Integer period; // 1 to 8
    private List<StudentMode> students;

    @Data
    public static class StudentMode {
        private String studentId;
        private String status; // PRESENT, ABSENT, EXCUSED
    }
}
