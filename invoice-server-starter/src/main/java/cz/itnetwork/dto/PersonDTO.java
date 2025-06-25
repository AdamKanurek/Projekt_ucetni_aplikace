
package cz.itnetwork.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import cz.itnetwork.constant.Countries;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonDTO {

    @JsonProperty("_id")
    private Long id;

    @NotBlank(message = "Zadejte prosím Vaše jméno nebo název Vaší firmy")
    private String name;

    @NotBlank(message = "Zadejte prosím Vaše IČO")
    private String identificationNumber;

    @NotBlank(message = "Zadejte prosím Vaše DIČO")
    private String taxNumber;

    @NotBlank(message = "Zadejte prosím číslo Vašeho účtu")
    private String accountNumber;

    @NotBlank(message = "Zadejte prosím číslo Vaší banky")
    private String bankCode;

    @NotBlank(message = "Zadejte prosím váš IBAN")
    private String iban;

    @NotBlank(message = "Zadejte prosím telefonní číslo")
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{9,15}$",
            message = "Telefonní číslo musí být platné, např. +420123456789")
    private String telephone;

    @NotBlank(message = "Email nesmí být prázdný")
    @Email(message = "Email musí být ve správném formátu, např. email@email.cz")
    private String mail;

    @NotBlank(message = "Zadejte prosím platnou ulici")
    private String street;

    @NotBlank(message = "Zadejte prosím platné poštovní směrovací číslo")
    private String zip;

    @NotBlank(message = "Zadejte prosím platné město")
    private String city;

    @NotNull(message = "Zadejte prosím stát")
    private Countries country;

    @NotBlank(message = "Vyplňte prosím poznámku")
    private String note;
}
