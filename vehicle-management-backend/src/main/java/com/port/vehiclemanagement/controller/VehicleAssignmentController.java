package com.port.vehiclemanagement.controller;

import com.port.vehiclemanagement.model.VehicleAssignment;
import com.port.vehiclemanagement.service.VehicleAssignmentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "http://localhost:4200")
public class VehicleAssignmentController {
    private final VehicleAssignmentService service;

    public VehicleAssignmentController(VehicleAssignmentService service) {
        this.service = service;
    }

    @GetMapping
    public List<VehicleAssignment> getAll() {
        return service.findAll();
    }

    @PostMapping
    public VehicleAssignment create(@RequestBody VehicleAssignment va) {
        return service.save(va);
    }

    @PutMapping("/{id}")
    public VehicleAssignment update(@PathVariable Long id, @RequestBody VehicleAssignment va) {
        va.setId(id);
        return service.save(va);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}