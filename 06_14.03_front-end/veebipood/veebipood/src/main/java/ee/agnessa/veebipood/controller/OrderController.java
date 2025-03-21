package ee.agnessa.veebipood.controller;

import ee.agnessa.veebipood.entity.Order;
import ee.agnessa.veebipood.entity.Product;
import ee.agnessa.veebipood.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class OrderController {
    @Autowired
    OrderRepository orderRepository;

    @GetMapping("orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    //TODO: Ei tagastata koiki tellimusi
    //TODO: pean votma front-endist ainult id ja mitte usaldama front-endist tulevat toote hinda
    @PostMapping("orders")
    public List<Order> addOrder(@RequestBody Order order) {
        order.setCreated(new Date());
        double sum = 0;
        for (Product p: order.getProducts()) {
            sum = sum + p.getPrice();
        }
        order.setTotalSum(sum);
        orderRepository.save(order);
        return orderRepository.findAll();
    }

}
