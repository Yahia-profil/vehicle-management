package com.port.vehiclemanagement.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Pointeur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}