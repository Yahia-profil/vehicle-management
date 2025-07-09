package com.port.vehiclemanagement.repository;

import com.port.vehiclemanagement.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {}