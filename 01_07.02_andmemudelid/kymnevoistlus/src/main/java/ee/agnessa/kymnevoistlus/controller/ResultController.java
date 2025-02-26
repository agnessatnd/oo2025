package ee.agnessa.kymnevoistlus.controller;

import ee.agnessa.kymnevoistlus.entity.Athlete;
import ee.agnessa.kymnevoistlus.entity.Result;
import ee.agnessa.kymnevoistlus.repository.AthleteRepository;
import ee.agnessa.kymnevoistlus.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class ResultController {
    @Autowired
    ResultRepository resultRepository;
    @Autowired
    private AthleteRepository athleteRepository;

    //tulemuse lisamine
    @PostMapping("results")
    public List<Result> addResult(@RequestBody Result result) {
        if (result.getEvent() == null || result.getEvent().isEmpty()){
            throw new RuntimeException("ERROR_CANNOT_ADD_WITHOUT_EVENT");
        }
        if (result.getPerformance() <= 0){
            throw new RuntimeException("ERROR_PERFORMANCE_MUST_BE_POSITIVE");
        }

        int points = calculatePoints(result.getEvent(), result.getPerformance());
        if (points <= 0){
            throw new RuntimeException("ERROR_POINTS_MUST_BE_POSITIVE");
        }

        result.setPoints(points);
        resultRepository.save(result);

        // lisame sportlase külge tema punktide kogusumma kasutades for tsüklit
        Athlete athlete = athleteRepository.findById(result.getAthlete().getId()).orElseThrow(()->new RuntimeException("ATHLETE_NOT_FOUND"));
        if (athlete != null) {
            List<Result> athleteResults = resultRepository.findByAthleteId(athlete.getId());

            int totalPoints = 0;
            for (Result athleteResult : athleteResults) {
                totalPoints += athleteResult.getPoints();
            }

            athlete.setTotalPoints(totalPoints);
            athleteRepository.save(athlete);

            return resultRepository.findAll();
        } else {
            throw new RuntimeException("ERROR_ATHLETE_NOT_FOUND");
        }
    }

    // meetod punktide arvutamiseks, mille sisenditeks on ala koos tulemusega
    private int calculatePoints(String event, Double performance) {
        // A, B, C on ala spetsiifilised parameetrid
        double A, B, C;

        switch (event.toLowerCase()){
            case "100m jooks":
                A = 25.4347; B = 18; C = 1.81;
                //näide: kui sportlane jooksis 100m ajaga 11.50 sekundit, siis punktide arvutus on järgmine:
                // 25.4347 * ((18 - 11.50) ^ 1.81) = 753 (ligikaudu)
                return (int) (A * Math.pow(B - performance, C));
            case "kaugushüpe":
                A = 0.14354; B = 220; C = 1.4;
                return (int) (A * Math.pow(performance * 100 - B, C));
            case "kuulitõuge":
                A = 51.39; B = 1.5; C = 1.05;
                return (int) (A * Math.pow(performance - B, C));
            case "kõrgushüpe":
                A = 0.8465; B = 75; C = 1.42;
                return (int) (A * Math.pow(performance * 100 - B, C));
            case "400m jooks":
                A = 1.53775; B = 82; C = 1.81;
                return (int) (A * Math.pow(B - performance, C));
            case "110m tõkkejooks":
                A = 5.74352; B = 28.5; C = 1.92;
                return (int) (A * Math.pow(B - performance, C));
            case "kettaheide":
                A = 12.91; B = 4; C = 1.1;
                return (int) (A * Math.pow(performance - B, C));
            case "teivashüpe":
                A = 0.2797; B = 100; C = 1.35;
                return (int) (A * Math.pow(performance * 100 - B, C));
            case "odavise":
                A = 10.14; B = 7; C = 1.08;
                return (int) (A * Math.pow(performance - B, C));
            case "1500m jooks":
                A = 0.03768; B = 480; C = 1.85;
                return (int) (A * Math.pow(B - performance, C));
            default:
                throw new RuntimeException("ERROR_UNKNOWN_EVENT");
        }
    }

    //koikide tulemuste leidmine
    @GetMapping("results")
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    //tulemuse eemaldamine
    @DeleteMapping("results/{id}")
    public List<Result> deleteResult(@PathVariable Long id) {
        if (!resultRepository.existsById(id)) {
            throw new RuntimeException("ERROR_RESULT_NOT_FOUND");
        }
        resultRepository.deleteById(id);
        return resultRepository.findAll();
    }
}
