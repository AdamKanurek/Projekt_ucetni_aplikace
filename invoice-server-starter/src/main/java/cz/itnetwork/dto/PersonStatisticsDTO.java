package cz.itnetwork.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class PersonStatisticsDTO {

    @JsonProperty("_id")
    private Long id;
    private String identificationNumber;
    private String personName;
    private BigDecimal revenue;
}
