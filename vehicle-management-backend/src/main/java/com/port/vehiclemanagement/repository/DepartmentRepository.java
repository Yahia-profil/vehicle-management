package com.port.vehiclemanagement.repository;

import com.port.vehiclemanagement.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {}