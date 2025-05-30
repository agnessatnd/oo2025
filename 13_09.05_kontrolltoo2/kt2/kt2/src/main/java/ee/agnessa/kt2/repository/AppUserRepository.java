package ee.agnessa.kt2.repository;

import ee.agnessa.kt2.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
}
