package ee.agnessa.kt2.repository;

import ee.agnessa.kt2.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserId(Long UserId);
    List<Todo> findByTitleContainingIgnoreCase(String title);

}
