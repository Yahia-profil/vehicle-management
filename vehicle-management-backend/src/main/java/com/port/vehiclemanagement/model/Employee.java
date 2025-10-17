package com.port.vehiclemanagement.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Employee {
    public enum Role {
        CHEF_EQUIPE,
        CHEF_ESCALE,
        POINTEUR
    }

    public enum Shift {
        SHIFT_1,
        SHIFT_2,
        SHIFT_3
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private Shift shift;
}