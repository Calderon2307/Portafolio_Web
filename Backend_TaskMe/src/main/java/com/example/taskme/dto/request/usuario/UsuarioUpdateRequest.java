package com.example.taskme.dto.request.usuario;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioUpdateRequest {
    @NotNull(message = "El id es obligatorio")
    private Long id;

    @JsonProperty(value = "id_ubicacion")
    private Long ubicacionId;

    @JsonProperty(value = "foto_perfil")
    @Size(max = 255, message = "La URL de la foto no debe superar 255 caracteres")
    private String fotoPerfil;

    @JsonProperty(value = "nombre_usuario")
    @Size(min = 4, max = 255, message = "El nombre no debe superar 255 caracteres")
    private String nombre;

    @JsonProperty(value = "direccion_completa")
    @Size(max = 255, message = "La dirección no debe superar 255 caracteres")
    private String direccionCompleta;

    @JsonProperty(value = "es_tasker")
    private Boolean esTasker;

    @JsonProperty(value = "numero_telefono")
    @Size(min = 8, max = 20, message = "El teléfono no debe superar 20 caracteres")
    private String telefono;

    @JsonProperty(value = "tasker_biografia")
    @Size(max = 1500, message = "La biografía no debe superar 1500 caracteres")
    private String biografia;
}
