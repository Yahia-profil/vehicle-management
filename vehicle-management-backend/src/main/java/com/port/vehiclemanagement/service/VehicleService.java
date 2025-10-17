package com.port.vehiclemanagement.service;

import com.port.vehiclemanagement.model.Vehicle;
import com.port.vehiclemanagement.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;
import com.port.vehiclemanagement.model.VehicleStatisticsDTO;
import java.util.Map;
import java.util.stream.Collectors;

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
        boolean licenseExists = repository.findAll().stream().anyMatch(
            veh -> veh.getLicensePlate().equalsIgnoreCase(v.getLicensePlate()) && (v.getId() == null || !veh.getId().equals(v.getId()))
        );
        if (licenseExists) {
            throw new DataIntegrityViolationException("Vehicle with this license plate already exists.");
        }
        boolean barcodeExists = repository.findAll().stream().anyMatch(
            veh -> veh.getBarcode() != null && v.getBarcode() != null && veh.getBarcode().equalsIgnoreCase(v.getBarcode()) && (v.getId() == null || !veh.getId().equals(v.getId()))
        );
        if (barcodeExists) {
            throw new DataIntegrityViolationException("Vehicle with this barcode already exists.");
        }
        return repository.save(v);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public VehicleStatisticsDTO getStatistics() {
        List<Vehicle> vehicles = repository.findAll();
        long total = vehicles.size();
        Map<String, Long> byType = vehicles.stream()
            .collect(Collectors.groupingBy(Vehicle::getType, Collectors.counting()));
        Map<String, Long> byStatus = vehicles.stream()
            .collect(Collectors.groupingBy(Vehicle::getStatus, Collectors.counting()));
        return new VehicleStatisticsDTO(total, byType, byStatus);
    }
}