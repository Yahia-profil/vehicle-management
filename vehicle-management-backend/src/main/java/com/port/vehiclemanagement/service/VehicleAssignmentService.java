package com.port.vehiclemanagement.service;

import com.port.vehiclemanagement.model.VehicleAssignment;
import com.port.vehiclemanagement.repository.VehicleAssignmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VehicleAssignmentService {
    private final VehicleAssignmentRepository repository;

    public VehicleAssignmentService(VehicleAssignmentRepository repository) {
        this.repository = repository;
    }

    public List<VehicleAssignment> findAll() {
        return repository.findAll();
    }

    public VehicleAssignment save(VehicleAssignment va) {
        return repository.save(va);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}