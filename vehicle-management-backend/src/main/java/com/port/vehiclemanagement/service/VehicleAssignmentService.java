package com.port.vehiclemanagement.service;

import com.port.vehiclemanagement.model.VehicleAssignment;
import com.port.vehiclemanagement.repository.VehicleAssignmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;

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
        // Prevent duplicate assignment: same vehicle and date
        boolean exists = repository.findAll().stream().anyMatch(
            a -> a.getVehicle().getId().equals(va.getVehicle().getId()) &&
                 a.getAssignmentDate().equals(va.getAssignmentDate()) &&
                 (va.getId() == null || !a.getId().equals(va.getId()))
        );
        if (exists) {
            throw new DataIntegrityViolationException("This vehicle is already assigned for the selected date.");
        }
        return repository.save(va);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}