package ee.agnessa.kymnevoistlus.controller;

import ee.agnessa.kymnevoistlus.entity.Athlete;
import ee.agnessa.kymnevoistlus.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5174")
@RestController
public class AthleteController {
    @Autowired
    AthleteRepository athleteRepository;
    //koikide sportlaste leidmine
    @GetMapping("athletes")
    public List<Athlete> getAthletes() {
        return athleteRepository.findAll();
    }
    //sportlase lisamine
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

    //küsime konkreetse sportlase andmeid
    @GetMapping("athletes/{id}")
    public Athlete getAthlete(@PathVariable Long id) {
        return athleteRepository.findById(id).orElseThrow();
    }
    //küsime ainult punktide kogusummat konkreetse sportlase puhul
    @GetMapping("athletes/{id}/points")
    public Integer getAthletePoints(@PathVariable Long id) {
        Athlete athlete = athleteRepository.findById(id).orElseThrow(() -> new RuntimeException("ERROR_ATHLETE_NOT_FOUND"));
        return athlete.getTotalPoints();
    }

    @PutMapping("athletes")
    public List<Athlete> editAthlete(@RequestBody Athlete athlete) {
        if (athlete.getId() == null || athlete.getId() == 0) {
            throw new RuntimeException("ERROR_ID_IS_MISSING");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }
}
