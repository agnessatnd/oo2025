package ee.agnessa.kontrolltoo.repository;

import ee.agnessa.kontrolltoo.entity.Speed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpeedRepository extends JpaRepository<Speed, Long> {
}
