package com.university.antigravity.repository;

import com.university.antigravity.model.Attendance;
import com.university.antigravity.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends MongoRepository<Attendance, String> {
    List<Attendance> findByUser(User user);
}
