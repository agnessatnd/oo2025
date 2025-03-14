package ee.agnessa.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "orders") //ab-s tuleb tabeli nimeks orders
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date created; //Date importida

    @ManyToOne
    private Person person;

    @ManyToMany
    private List<Product> products;

    private double totalSum;
}
