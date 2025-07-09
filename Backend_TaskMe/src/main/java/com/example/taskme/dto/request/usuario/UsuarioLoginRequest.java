package com.example.taskme.dto.request.usuario;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioLoginRequest {
    @JsonProperty(value = "correo_electronico")
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El correo electronicod debe ser valido")
    private String email;

    @JsonProperty(value = "contraseña")
    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "La contra seña debe tener minimo 8 caracteres")
    private String password;
}
