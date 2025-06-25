package cz.itnetwork.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO {

    @JsonProperty("_id")
    private Long id;

    @NotNull(message = "Zadejte prosím číslo faktury")
    @Positive(message = "Číslo faktury musí být kladné")
    private Integer invoiceNumber;

    @NotNull(message = "Zadejte prosím prodávajícího")
    private PersonDTO seller;

    @NotNull(message = "Zadejte prosím kupujícího")
    private PersonDTO buyer;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotNull(message = "Zadejte datum vystavení")
    private LocalDate issued;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotNull(message = "Zadejte datum splatnosti")
    private LocalDate dueDate;

    @NotBlank(message = "Vyplňte prosím o jaký produkt se jedná")
    private String product;

    @NotNull(message = "Zadejte prosím částku")
    @Positive(message = "Cena musí být kladná")
    private Long price;

    @NotNull(message = "Zadejte prosím výši DPH v %")
    @Min(value = 0, message = "DPH nesmí být záporné")
    @Max(value = 100, message = "DPH nemůže být větší než 100 %")
    private Integer vat;

    @NotBlank(message = "Vyplňte prosím poznámku")
    private String note;
}


