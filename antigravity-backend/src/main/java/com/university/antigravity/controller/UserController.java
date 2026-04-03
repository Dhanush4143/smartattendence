package com.university.antigravity.controller;

import com.university.antigravity.controller.payload.CreateUserRequest;
import com.university.antigravity.model.Role;
import com.university.antigravity.model.User;
import com.university.antigravity.repository.UserRepository;
import com.university.antigravity.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Optional<User> userOptional = userRepository.findById(userDetails.getId());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(null); // Don't return password
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/students")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<List<User>> getAllStudents() {
        List<User> students = userRepository.findAllByRole(Role.STUDENT);
        students.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(students);
    }

    @PostMapping("/students")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> createStudent(@RequestBody CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already taken");
        }
        User student = new User();
        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setPassword(passwordEncoder.encode(request.getPassword()));
        student.setRole(Role.STUDENT);
        userRepository.save(student);
        return ResponseEntity.ok("Student created successfully");
    }
}
