package com.port.vehiclemanagement.controller;

import com.port.vehiclemanagement.model.Pointeur;
import com.port.vehiclemanagement.service.PointeurService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pointeures")
@CrossOrigin(origins = "http://localhost:4200")
public class PointeurController {
    private final PointeurService service;

    public PointeurController(PointeurService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pointeur> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Pointeur create(@RequestBody Pointeur p) {
        return service.save(p);
    }

    @PutMapping("/{id}")
    public Pointeur update(@PathVariable Long id, @RequestBody Pointeur p) {
        p.setId(id);
        return service.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}