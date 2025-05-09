package ee.agnessa.words.controller;

import ee.agnessa.words.entity.Manager;
import ee.agnessa.words.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class ManagerController {

    @Autowired
    private ManagerRepository managerRepository;

    @GetMapping("manager")
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    @PostMapping("manager")
    public List<Manager> addManager(@RequestBody Manager manager) {
        managerRepository.save(manager);
        return managerRepository.findAll();
    }

    @GetMapping("manager/{id}")
    public Manager getManager(@PathVariable Long id) {
        return managerRepository.findById(id).orElseThrow();
    }
}

