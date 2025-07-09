package com.port.vehiclemanagement.service;

import com.port.vehiclemanagement.model.Vehicle;
import com.port.vehiclemanagement.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VehicleService {
    private final VehicleRepository repository;

    public VehicleService(VehicleRepository repository) {
        this.repository = repository;
    }

    public List<Vehicle> findAll() {
        return repository.findAll();
    }

    public Vehicle save(Vehicle v) {
        return repository.save(v);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}