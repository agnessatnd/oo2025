package ee.agnessa.veebipood.controller;

import ee.agnessa.veebipood.entity.Product;
import ee.agnessa.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import ee.agnessa.veebipood.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;
    //localhost:8080/products
    @GetMapping("products")
    public List<Product> getProducts() {
        return productRepository.findAll(); //SELECT *  FROM
    }
    @PostMapping("products")
    public List<Product> addProduct(@RequestBody Product product) {
        if (product.getId() != null){
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (product.getPrice() <= 0){
            throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
        }
        productRepository.save(product); //INSERT INTO products
        return productRepository.findAll();
    }


//    @GetMapping("/category-products")
//    public List<Product> getCategoryProducts(@RequestParam Long categoryId) {
//        List<Product> products = productRepository.findAll();
//        List<Product> filteredProducts = new ArrayList<>();
//        for (Product p : products) {
//            if (p.getCategory().getId().equals(categoryId)){
//                filteredProducts.add(p);
//            }
//        }
//        return filteredProducts;
//    }

    // DELETE localhost:8080/products/1
    @DeleteMapping("products/{id}")
    public List<Product> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return productRepository.findAll();
    }
    @PutMapping("products")
    public List<Product> editProduct(@RequestBody Product product) {
        if (product.getId() == null){
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if (product.getPrice() <= 0){
            throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
        }
        productRepository.save(product);
        return productRepository.findAll();
    }

    @GetMapping("products/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    // 2 voi enama parameetriga tuleks kasutada RequestParam
    // localhost:8080/products/4/name/Aura
    @PatchMapping("products") //PATCH localhost:8080/products?id=4&field=name&value=Aura
    public List<Product> editProductValue(@RequestParam Long id, String field, String value) {
        if (id == null){
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        Product product = productRepository.findById(id).orElseThrow();
        switch (field) {
            case "name" -> product.setName(value);
            case "price" -> {
                if (Double.parseDouble(value) <= 0){
                    throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
                }
                product.setPrice(Double.parseDouble(value));
            }
            case "image" -> product.setImage(value);
            case "active" -> product.setActive(Boolean.parseBoolean(value));
        }
        productRepository.save(product);
        return productRepository.findAll();
    }

    //http://localhost:8080/category-products?categoryId=1
    @GetMapping("category-products")
    public Page<Product> getCategoryProducts(@RequestParam Long categoryId, Pageable pageable) {
        if (categoryId == -1){
            return productRepository.findAll(pageable);
        }
        return productRepository.findByCategory_Id(categoryId, pageable);
    }
}
