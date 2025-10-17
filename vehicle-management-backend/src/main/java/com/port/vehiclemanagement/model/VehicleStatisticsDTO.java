package com.port.vehiclemanagement.model;

import java.util.Map;

public class VehicleStatisticsDTO {
    private long totalVehicles;
    private Map<String, Long> vehiclesByType;
    private Map<String, Long> vehiclesByStatus;

    public VehicleStatisticsDTO() {}

    public VehicleStatisticsDTO(long totalVehicles, Map<String, Long> vehiclesByType, Map<String, Long> vehiclesByStatus) {
        this.totalVehicles = totalVehicles;
        this.vehiclesByType = vehiclesByType;
        this.vehiclesByStatus = vehiclesByStatus;
    }

    public long getTotalVehicles() {
        return totalVehicles;
    }

    public void setTotalVehicles(long totalVehicles) {
        this.totalVehicles = totalVehicles;
    }

    public Map<String, Long> getVehiclesByType() {
        return vehiclesByType;
    }

    public void setVehiclesByType(Map<String, Long> vehiclesByType) {
        this.vehiclesByType = vehiclesByType;
    }

    public Map<String, Long> getVehiclesByStatus() {
        return vehiclesByStatus;
    }

    public void setVehiclesByStatus(Map<String, Long> vehiclesByStatus) {
        this.vehiclesByStatus = vehiclesByStatus;
    }
} 