package com.port.vehiclemanagement.service;

import com.port.vehiclemanagement.model.Department;
import com.port.vehiclemanagement.repository.DepartmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;

@Service
public class DepartmentService {
    private final DepartmentRepository repository;

    public DepartmentService(DepartmentRepository repository) {
        this.repository = repository;
    }

    public List<Department> findAll() {
        return repository.findAll();
    }

    public Department save(Department d) {
        boolean exists = repository.findAll().stream().anyMatch(
            dep -> dep.getName().equalsIgnoreCase(d.getName()) && (d.getId() == null || !dep.getId().equals(d.getId()))
        );
        if (exists) {
            throw new DataIntegrityViolationException("Department with this name already exists.");
        }
        return repository.save(d);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}