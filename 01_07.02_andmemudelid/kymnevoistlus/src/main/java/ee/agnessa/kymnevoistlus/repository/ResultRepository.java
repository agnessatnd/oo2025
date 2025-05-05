package ee.agnessa.kymnevoistlus.repository;

import ee.agnessa.kymnevoistlus.entity.Result;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

    List<Result> findByAthlete_Id(Long athleteId);

    Page<Result> findByAthlete_Id(Long athleteId, Pageable pageable);

    Page<Result> findByAthlete_Country(String country, Pageable pageable);

}

