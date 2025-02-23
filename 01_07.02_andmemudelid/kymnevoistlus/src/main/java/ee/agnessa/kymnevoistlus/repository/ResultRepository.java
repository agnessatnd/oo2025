package ee.agnessa.kymnevoistlus.repository;

import ee.agnessa.kymnevoistlus.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByAthleteId(Long athleteId);
}
