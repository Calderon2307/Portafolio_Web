package com.example.taskme.dto.request.usuario;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioRequest {
    @JsonProperty(value = "id_ubicacion")
    @NotNull(message = "La ubicación es obligatoria")
    private Long ubicacionId;

    @JsonProperty(value = "foto_perfil")
    @Size(max = 255, message = "La URL de la foto no debe superar 255 caracteres")
    private String fotoPerfil;

    @JsonProperty(value = "nombre_usuario")
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 4, max = 255, message = "El nombre no debe superar 255 caracteres")
    private String nombre;

    @JsonProperty(value = "correo_electronico")
    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo debe ser válido")
    private String correo;

    @JsonProperty(value = "contrasenia")
    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    private String contrasena;

    @JsonProperty(value = "direccion_completa")
    @Size(max = 255, message = "La dirección no debe superar 255 caracteres")
    private String direccionCompleta;

    @JsonProperty(value = "es_tasker")
    @NotNull(message = "El indicador de 'Tasker' es obligatorio")
    private Boolean esTasker;

    @JsonProperty(value = "numero_telefono")
    @Size(min = 8, max = 20, message = "El teléfono no debe superar 20 caracteres")
    private String telefono;

    @JsonProperty(value = "tasker_biografia")
    @Size(max = 1500, message = "La biografía no debe superar 1500 caracteres")
    private String biografia;
}
