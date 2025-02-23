package ee.agnessa.kymnevoistlus.controller;

import ee.agnessa.kymnevoistlus.entity.Athlete;
import ee.agnessa.kymnevoistlus.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class AthleteController {
    @Autowired
    AthleteRepository athleteRepository;

    @GetMapping("athletes")
    public List<Athlete> getAthletes() {
        return athleteRepository.findAll();
    }

    @PostMapping("athletes")
    public List<Athlete> addAthlete(@RequestBody Athlete athlete) {
        if (athlete.getName() == null || athlete.getName().isEmpty()) {
            throw new RuntimeException("ERROR_NAME_IS_MISSING");
        }
        if (athlete.getAge() == null){
            throw new RuntimeException("ERROR_AGE_IS_MISSING");
        }
        if (athlete.getCountry() == null || athlete.getCountry().isEmpty()) {
            throw new RuntimeException("ERROR_COUNTRY_IS_MISSING");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }

    @DeleteMapping("athletes/{id}")
    public List<Athlete> deleteAthlete(@PathVariable Long id) {
        athleteRepository.deleteById(id);
        return athleteRepository.findAll();
    }

    @PutMapping("athletes")
    public List<Athlete> editAthlete(@RequestBody Athlete athlete) {
        if (athlete.getName() == null || athlete.getName().isEmpty()) {
            throw new RuntimeException("ERROR_NAME_IS_MISSING");
        }
        if (athlete.getAge() == null){
            throw new RuntimeException("ERROR_AGE_IS_MISSING");
        }
        if (athlete.getCountry() == null || athlete.getCountry().isEmpty()) {
            throw new RuntimeException("ERROR_COUNTRY_IS_MISSING");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }
}
