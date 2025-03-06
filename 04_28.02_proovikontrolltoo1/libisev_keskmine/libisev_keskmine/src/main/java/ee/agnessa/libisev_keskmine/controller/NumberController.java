package ee.agnessa.libisev_keskmine.controller;

import ee.agnessa.libisev_keskmine.entity.Number;
import ee.agnessa.libisev_keskmine.repository.NumberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;

@RestController
public class NumberController {

    @Autowired
    NumberRepository numberRepository;

    @PostMapping("number")
    public List<Number> addNumber(@RequestBody Number number) {
        if (number.getNumber() == null){
            throw new RuntimeException("ERROR_NUMBER_CANNOT_BE_NULL");
        }
        numberRepository.save(number);
        return numberRepository.findAll();
    }
    @GetMapping("number")
    public List<Number> getNumber() {
        return numberRepository.findAll();
    }

    @GetMapping("number/sum")
    public Integer getNumberSum() {
        return numberRepository.findAll().stream().mapToInt(Number::getNumber).sum();
    }
    @GetMapping("number/average")
    public double getNumberAverage() {
        OptionalDouble average = numberRepository.findAll().stream().mapToInt(Number::getNumber).average();
        return average.orElse(0.0);
    }
    @GetMapping("number/max")
    public Integer getNumberMax() {
        Optional<Integer> max = numberRepository.findAll().stream().map(Number::getNumber).max(Integer::compare);
        return max.orElseThrow(() -> new RuntimeException("ERROR_NO_NUMBERS_IN_DATABASE"));
    }
    @GetMapping("number/moving-average")
    public List<Double> getMovingAverage() {
        List<Number> numbers = numberRepository.findAll();
        List<Double> movingAverages = new ArrayList<>();

        if (numbers.size() < 3) {
            throw new RuntimeException("ERROR_NOT_ENOUGH_NUMBERS_FOR_MOVING_AVERAGE");
        }

        for (int i = 0; i < numbers.size() - 2; i++) {
            double average = (numbers.get(i).getNumber() + numbers.get(i + 1).getNumber() + numbers.get(i + 2).getNumber()) / 3.0;
            movingAverages.add(average);
        }

        return movingAverages;
    }
}
