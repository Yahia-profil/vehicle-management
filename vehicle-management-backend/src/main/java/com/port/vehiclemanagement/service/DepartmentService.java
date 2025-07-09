package com.port.vehiclemanagement.service;

import com.port.vehiclemanagement.model.Department;
import com.port.vehiclemanagement.repository.DepartmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

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
        return repository.save(d);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}