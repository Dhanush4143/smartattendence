package com.university.antigravity.controller;

import com.university.antigravity.controller.payload.CreateModuleRequest;
import com.university.antigravity.model.Module;
import com.university.antigravity.model.User;
import com.university.antigravity.repository.ModuleRepository;
import com.university.antigravity.repository.UserRepository;
import com.university.antigravity.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Module>> getAllModules() {
        List<Module> modules = moduleRepository.findAll();
        // Clear passwords before returning
        modules.forEach(m -> {
            if (m.getTeacher() != null) {
                m.getTeacher().setPassword(null);
            }
        });
        return ResponseEntity.ok(modules);
    }

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> createModule(@RequestBody CreateModuleRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User teacher = userRepository.findById(userDetails.getId()).orElse(null);

        Module module = new Module();
        module.setName(request.getName());
        module.setDescription(request.getDescription());
        module.setTeacher(teacher);
        moduleRepository.save(module);

        return ResponseEntity.ok("Module created successfully");
    }
}
