package com.port.vehiclemanagement.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String licensePlate;
    private String barcode;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}