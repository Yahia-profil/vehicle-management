package com.port.vehiclemanagement.controller;

import com.port.vehiclemanagement.model.Department;
import com.port.vehiclemanagement.service.DepartmentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:4200")
public class DepartmentController {
    private final DepartmentService service;

    public DepartmentController(DepartmentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Department> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Department create(@RequestBody Department d) {
        return service.save(d);
    }

    @PutMapping("/{id}")
    public Department update(@PathVariable Long id, @RequestBody Department d) {
        d.setId(id);
        return service.save(d);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}