package com.example.taskme.dto.request.trabajoPrevio;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrabajoPrevioRequest {
    @JsonProperty(value = "usuario_id")
    @NotNull(message = "El id del usuario es obligatorio")
    private Long usuarioId;

    @JsonProperty(value = "imagen_trabajo")
    @NotBlank(message = "Debes proporcionar una imagen")
    private String urlImagen;

    @JsonProperty(value = "titulo_trabajo")
    @NotBlank(message = "El título es obligatorio")
    @Size(min = 4, max = 255, message = "El titulo debe tener entre 4 y 255 caracteres")
    private String titulo;

    @JsonProperty(value = "descripcion_trabajo")
    @Size(max = 750, message = "La descripcion no puede superar los 750 caracteres")
    private String descripcion;
}
