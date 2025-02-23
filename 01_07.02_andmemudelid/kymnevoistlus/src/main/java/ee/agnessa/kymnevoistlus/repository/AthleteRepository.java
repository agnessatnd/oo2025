package ee.agnessa.kymnevoistlus.repository;

import ee.agnessa.kymnevoistlus.entity.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Long> {

}
