package com.port.vehiclemanagement.repository;

import com.port.vehiclemanagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {}