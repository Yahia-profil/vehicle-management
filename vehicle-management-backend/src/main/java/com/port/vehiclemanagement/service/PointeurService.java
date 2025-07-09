package com.port.vehiclemanagement.service;

import com.port.vehiclemanagement.model.Pointeur;
import com.port.vehiclemanagement.repository.PointeurRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PointeurService {
    private final PointeurRepository repository;

    public PointeurService(PointeurRepository repository) {
        this.repository = repository;
    }

    public List<Pointeur> findAll() {
        return repository.findAll();
    }

    public Pointeur save(Pointeur p) {
        return repository.save(p);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}