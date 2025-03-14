package ee.agnessa.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.RestController;

//Hibernate
//tekib ab tabel, mis on klassi nimega
@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //int
    private String name;
    private double price;
    private String image;
    private boolean active;

    //@ManyToMany
    //@ManyToOne
    //@OneToMany
    //@OneToOne

    @ManyToOne
    private Category category;
}
