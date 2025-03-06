package ee.agnessa.hulknurk.repository;

import ee.agnessa.hulknurk.entity.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoordinateRepository extends JpaRepository<Coordinate, Long> {
}
