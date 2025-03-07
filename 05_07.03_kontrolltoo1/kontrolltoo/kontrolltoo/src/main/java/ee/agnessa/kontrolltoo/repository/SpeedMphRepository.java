package ee.agnessa.kontrolltoo.repository;

import ee.agnessa.kontrolltoo.entity.SpeedMph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpeedMphRepository extends JpaRepository<SpeedMph, Long> {
}
