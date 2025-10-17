package com.port.vehiclemanagement.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalTime;

@Entity
@Data
public class Arret {
    public enum Type {
        RETARD_ACOSTAGE,
        PANNE_VOITURE,
        LA_MARREE,
        MAUVAIS_TEMPS,
        RETARD_SAISISSAGE_DESAISISSAGE,
        DEHALLAGE,
        PROBLEME_RAMPE,
        ARRET_PAR_BORD,
        AUTRE
    }

    public enum Shift {
        SHIFT_1,
        SHIFT_2,
        SHIFT_3
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chef_escale_id")
    private Employee chefEscale;

    @ManyToOne
    @JoinColumn(name = "chef_equipe_id")
    private Employee chefEquipe;

    @Enumerated(EnumType.STRING)
    private Type type;

    private String description;

    @Enumerated(EnumType.STRING)
    private Shift shift;

    private LocalTime startTime;
    private LocalTime endTime;
} 