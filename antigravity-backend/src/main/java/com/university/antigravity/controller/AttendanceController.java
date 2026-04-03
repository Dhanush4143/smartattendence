package com.university.antigravity.controller;

import com.university.antigravity.controller.payload.AttendanceRequest;
import com.university.antigravity.controller.payload.BulkAttendanceRequest;
import com.university.antigravity.model.Attendance;
import com.university.antigravity.model.AttendanceStatus;
import com.university.antigravity.model.Module;
import com.university.antigravity.model.User;
import com.university.antigravity.repository.AttendanceRepository;
import com.university.antigravity.repository.ModuleRepository;
import com.university.antigravity.repository.UserRepository;
import com.university.antigravity.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @PostMapping("/mark")
    public ResponseEntity<?> markAttendance(@RequestBody AttendanceRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId()).orElse(null);
        Module module = moduleRepository.findById(request.getModuleId()).orElse(null);

        if (user == null || module == null) {
            return ResponseEntity.badRequest().body("User or Module not found");
        }

        Attendance attendance = new Attendance();
        attendance.setUser(user);
        attendance.setModule(module);
        attendance.setDate(LocalDate.parse(request.getDate()));
        attendance.setStatus(AttendanceStatus.valueOf(request.getStatus()));

        attendanceRepository.save(attendance);

        return ResponseEntity.ok("Attendance marked successfully");
    }

    @PostMapping("/bulk")
    public ResponseEntity<?> markBulkAttendance(@RequestBody BulkAttendanceRequest request) {
        Module module = moduleRepository.findById(request.getModuleId()).orElse(null);
        if (module == null) return ResponseEntity.badRequest().body("Module not found");

        for (BulkAttendanceRequest.StudentMode sm : request.getStudents()) {
            User student = userRepository.findById(sm.getStudentId()).orElse(null);
            if (student != null) {
                Attendance attendance = new Attendance();
                attendance.setUser(student);
                attendance.setModule(module);
                attendance.setDate(LocalDate.parse(request.getDate()));
                attendance.setPeriod(request.getPeriod());
                attendance.setStatus(AttendanceStatus.valueOf(sm.getStatus()));
                attendanceRepository.save(attendance);
            }
        }
        return ResponseEntity.ok("Bulk attendance marked successfully");
    }

    @GetMapping("/report")
    public ResponseEntity<?> getAttendanceReport() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<Attendance> attendances;
        
        // If student, get their own attendance. If teacher, get all.
        if (userDetails.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_TEACHER"))) {
            attendances = attendanceRepository.findAll();
        } else {
            User user = userRepository.findById(userDetails.getId()).orElse(null);
            attendances = attendanceRepository.findByUser(user);
        }

        // Clean sensitive data
        attendances.forEach(a -> {
            a.getUser().setPassword(null);
            if (a.getModule().getTeacher() != null) {
                a.getModule().getTeacher().setPassword(null);
            }
        });

        return ResponseEntity.ok(attendances);
    }
}
