package com.university.antigravity;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("dev")
class AntiGravityApplicationTests {

    @Test
    void contextLoads() {
        // Verifies Spring context loads with H2 dev profile
    }
}
