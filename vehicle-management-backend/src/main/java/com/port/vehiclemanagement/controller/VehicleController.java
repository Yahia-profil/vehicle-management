package com.port.vehiclemanagement.controller;

import com.port.vehiclemanagement.model.Vehicle;
import com.port.vehiclemanagement.service.VehicleService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:4200")
public class VehicleController {
    private final VehicleService service;

    public VehicleController(VehicleService service) {
        this.service = service;
    }

    @GetMapping
    public List<Vehicle> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Vehicle create(@RequestBody Vehicle v) {
        return service.save(v);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PutMapping("/{id}")
    public Vehicle update(@PathVariable Long id, @RequestBody Vehicle v) {
        v.setId(id);
        return service.save(v);
    }
}