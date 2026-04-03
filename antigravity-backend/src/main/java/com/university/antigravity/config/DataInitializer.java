package com.university.antigravity.config;

import com.university.antigravity.model.Module;
import com.university.antigravity.model.Role;
import com.university.antigravity.model.User;
import com.university.antigravity.repository.ModuleRepository;
import com.university.antigravity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Only seed if DB is empty
        if (userRepository.count() == 0) {
            User teacher = new User();
            teacher.setName("Professor Gravity");
            teacher.setEmail("teacher@gravity.edu");
            teacher.setPassword(passwordEncoder.encode("password"));
            teacher.setRole(Role.TEACHER);
            userRepository.save(teacher);

            User alice = new User();
            alice.setName("Alice Student");
            alice.setEmail("alice@student.edu");
            alice.setPassword(passwordEncoder.encode("password"));
            alice.setRole(Role.STUDENT);
            userRepository.save(alice);

            User bob = new User();
            bob.setName("Bob Student");
            bob.setEmail("bob@student.edu");
            bob.setPassword(passwordEncoder.encode("password"));
            bob.setRole(Role.STUDENT);
            userRepository.save(bob);

            Module module1 = new Module();
            module1.setName("Introduction to Anti-Gravity");
            module1.setDescription("Fundamentals of defying gravity using magnetic levitation concepts. Explores Meissner effect, superconductor principles, and practical field applications.");
            module1.setTeacher(teacher);
            moduleRepository.save(module1);

            Module module2 = new Module();
            module2.setName("Advanced Propulsion Systems");
            module2.setDescription("Theoretical study of propulsion engines that operate independent of conventional mass constraints. Topics include ion drives, photon sails, and warp field preliminaries.");
            module2.setTeacher(teacher);
            moduleRepository.save(module2);

            Module module3 = new Module();
            module3.setName("Quantum Field Manipulation");
            module3.setDescription("Explores interaction between quantum vacuum energy and macroscopic objects. Research focus on zero-point energy extraction and Casimir force applications.");
            module3.setTeacher(teacher);
            moduleRepository.save(module3);

            System.out.println("✅ DataInitializer: Seeded 3 users and 3 modules.");
        }
    }
}
