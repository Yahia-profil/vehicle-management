package com.port.vehiclemanagement.service;

import com.port.vehiclemanagement.model.Arret;
import com.port.vehiclemanagement.repository.ArretRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ArretService {
    private final ArretRepository repository;

    public ArretService(ArretRepository repository) {
        this.repository = repository;
    }

    public List<Arret> findAll() {
        return repository.findAll();
    }

    public Arret save(Arret a) {
        return repository.save(a);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
} 