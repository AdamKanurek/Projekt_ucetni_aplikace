package cz.itnetwork.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDTO {

    @JsonProperty("_id")
    private long userId;

    @Email
    private String email;

    @NotBlank(message = "Vyplňte uživatelské heslo")
    @Size(min = 6, message = "Heslo musí obsahovat alespoň 6 znaků")
    private String password;

    @JsonProperty("isAdmin")
    private boolean admin;
}
