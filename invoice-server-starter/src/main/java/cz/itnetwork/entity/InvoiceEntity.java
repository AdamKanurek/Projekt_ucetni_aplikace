package cz.itnetwork.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity(name = "invoice")
@Getter
@Setter
public class InvoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private int invoiceNumber;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private PersonEntity seller;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private PersonEntity buyer;

    @Column(nullable = false)
    private LocalDate issued;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private String product;

    @Column(nullable = false)
    private long price;

    @Column(nullable = false)
    private int vat;

    private String note;

}
