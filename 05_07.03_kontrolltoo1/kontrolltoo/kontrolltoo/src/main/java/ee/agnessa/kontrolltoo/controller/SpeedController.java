package ee.agnessa.kontrolltoo.controller;

import ee.agnessa.kontrolltoo.entity.Speed;
import ee.agnessa.kontrolltoo.entity.SpeedMph;
import ee.agnessa.kontrolltoo.repository.SpeedMphRepository;
import ee.agnessa.kontrolltoo.repository.SpeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.OptionalDouble;
import java.util.stream.Collectors;

@RestController
public class SpeedController {
    @Autowired
    SpeedRepository speedRepository;

    @Autowired
    SpeedMphRepository speedMphRepository;

    @PostMapping("speed")
    public List<Speed> addSpeed(@RequestBody Speed speed) {
        if (speed.getSpeed() == null){
            throw new RuntimeException("ERROR_SPEED_CANNOT_BE_NULL");
        }
        if (speed.getSpeed() <= 0) {
            throw new RuntimeException("ERROR_SPEED_MUST_BE_POSITIVE");
        }

        speedRepository.save(speed);
        return speedRepository.findAll();
    }
    @GetMapping("speed")
    public List<Speed> getSpeed() {
        return speedRepository.findAll();
    }
    @GetMapping("speed/average")
    public double getSpeedAverage() {
        OptionalDouble average = speedRepository.findAll().stream().mapToInt(Speed::getSpeed).average();
        return average.orElse(0.0);
    }

    @GetMapping("speed/average-mph")
    public double getSpeedAverageMph() {
        return getSpeedAverage() * 0.621371;
    }

    @GetMapping("speed/convert-to-mph")
    public List<SpeedMph> convertSpeedsToMph() {
        List<Speed> speeds = speedRepository.findAll();
        List<SpeedMph> mphSpeeds = speeds.stream()
                .map(speed -> {
                    SpeedMph speedMph = new SpeedMph();
                    speedMph.setSpeedMph(speed.getSpeed() * 0.621371);
                    speedMph.setOriginalSpeed(speed);
                    return speedMphRepository.save(speedMph);
                })
                .collect(Collectors.toList());
        return mphSpeeds;
    }

    @GetMapping("speed/mph")
    public List<SpeedMph> getSpeedMph() {
        return speedMphRepository.findAll();
    }

    @GetMapping("speed/increment")
    public List<Speed> incrementSpeed() {
        List<Speed> speeds = speedRepository.findAll();
        speeds.forEach(speed -> speed.setSpeed(speed.getSpeed() + 1));
        speedRepository.saveAll(speeds);
        return speeds;
    }

    @GetMapping("speed/mph/increment")
    public List<SpeedMph> incrementSpeedMph() {
        List<SpeedMph> speedMphs = speedMphRepository.findAll();
        speedMphs.forEach(speedMph -> {
            if (speedMph.getSpeedMph() == null) {
                speedMph.setSpeedMph(0.0);
            }
            speedMph.setSpeedMph(speedMph.getSpeedMph() + 1);
        });
        speedMphRepository.saveAll(speedMphs);
        return speedMphs;
    }

}
