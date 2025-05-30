package ee.agnessa.kt2.controller;

import ee.agnessa.kt2.entity.AppUser;
import ee.agnessa.kt2.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class AppUserController {
    @Autowired
    private AppUserRepository appUserRepository;

    @GetMapping("appuser")
    public List<AppUser> getAppUsers() {
        return appUserRepository.findAll();
    }
    @PostMapping("appuser")
    public List<AppUser> addAppUser(@RequestBody AppUser appUser) {
        appUserRepository.save(appUser);
        return appUserRepository.findAll();
    }
    @GetMapping("appuser/{id}")
    public AppUser getAppUser(@PathVariable Long id) {
        return appUserRepository.findById(id).orElseThrow();
    }
}
