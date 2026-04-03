package com.university.antigravity.controller;

import com.university.antigravity.model.Attendance;
import com.university.antigravity.model.Report;
import com.university.antigravity.model.User;
import com.university.antigravity.repository.AttendanceRepository;
import com.university.antigravity.repository.ReportRepository;
import com.university.antigravity.repository.UserRepository;
import com.university.antigravity.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        return ResponseEntity.ok(reportRepository.findAll());
    }

    @PostMapping("/generate")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> generateReport() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User teacher = userRepository.findById(userDetails.getId()).orElse(null);
        if (teacher == null) return ResponseEntity.badRequest().body("User not found");

        List<Attendance> all = attendanceRepository.findAll();

        // Build a simple JSON-like data summary string
        StringBuilder sb = new StringBuilder();
        sb.append("Generated at: ").append(LocalDateTime.now()).append("\n");
        sb.append("Total Records: ").append(all.size()).append("\n");
        long presentCount = all.stream().filter(a -> a.getStatus().name().equals("PRESENT")).count();
        long absentCount = all.stream().filter(a -> a.getStatus().name().equals("ABSENT")).count();
        long excusedCount = all.stream().filter(a -> a.getStatus().name().equals("EXCUSED")).count();
        sb.append("Present: ").append(presentCount).append("\n");
        sb.append("Absent: ").append(absentCount).append("\n");
        sb.append("Excused: ").append(excusedCount).append("\n");

        Report report = new Report();
        report.setGeneratedBy(teacher);
        report.setDateGenerated(LocalDateTime.now());
        report.setData(sb.toString());
        reportRepository.save(report);

        return ResponseEntity.ok(report);
    }
}
