package com.port.vehiclemanagement.service;

import com.port.vehiclemanagement.model.Employee;
import com.port.vehiclemanagement.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;

@Service
public class EmployeeService {
    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> findAll() {
        return repository.findAll();
    }

    public Employee save(Employee p) {
        boolean exists = repository.findAll().stream().anyMatch(
            e -> e.getName().equalsIgnoreCase(p.getName()) && (p.getId() == null || !e.getId().equals(p.getId()))
        );
        if (exists) {
            throw new DataIntegrityViolationException("Employee with this name already exists.");
        }
        return repository.save(p);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}