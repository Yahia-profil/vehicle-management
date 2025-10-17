package com.port.vehiclemanagement.controller;

import com.port.vehiclemanagement.model.Arret;
import com.port.vehiclemanagement.service.ArretService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/arrets")
public class ArretController {
    private final ArretService service;

    public ArretController(ArretService service) {
        this.service = service;
    }

    @GetMapping
    public List<Arret> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Arret create(@RequestBody Arret a) {
        return service.save(a);
    }

    @PutMapping("/{id}")
    public Arret update(@PathVariable Long id, @RequestBody Arret a) {
        a.setId(id);
        return service.save(a);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
} 