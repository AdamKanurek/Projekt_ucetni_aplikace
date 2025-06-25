package cz.itnetwork.entity.filter;

import lombok.Data;

@Data
public class InvoiceFilter {

    private Long buyerID;
    private Long sellerID;
    private String product;
    private Long minPrice;
    private Long maxPrice;
    private Integer page = 0;
    private Integer limit = 15;
}
