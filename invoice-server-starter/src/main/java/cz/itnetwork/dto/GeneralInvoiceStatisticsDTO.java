package cz.itnetwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class GeneralInvoiceStatisticsDTO {

    private BigDecimal currentYearSum;
    private BigDecimal allTimeSum;
    private long invoicesCount;

}
