package ee.agnessa.libisev_keskmine.repository;

import ee.agnessa.libisev_keskmine.entity.Number;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NumberRepository extends JpaRepository<Number, Long> {
}
