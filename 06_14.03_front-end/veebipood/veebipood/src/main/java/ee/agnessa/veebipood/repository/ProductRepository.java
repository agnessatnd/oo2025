package ee.agnessa.veebipood.repository;

import ee.agnessa.veebipood.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>{
    //repository tagastab ainult kas Product, List<Product>

    Page<Product> findByCategory_Id(Long id, Pageable pageable);
}
