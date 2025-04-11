package ee.agnessa.veebipood.controller;

import ee.agnessa.veebipood.entity.Category;
import ee.agnessa.veebipood.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("categories")
    public List<Category> getCategory() {
        return categoryRepository.findAll(); //SELECT *  FROM
    }
    @PostMapping("categories")

    public List<Category> addCategory(@RequestBody Category category) {
        if (category.getId() != null){
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        categoryRepository.save(category); //INSERT INTO products
        return categoryRepository.findAll();
    }
    // DELETE localhost:8080/products/1
    @DeleteMapping("categories/{id}")
    public List<Category> deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return categoryRepository.findAll();
    }
}
