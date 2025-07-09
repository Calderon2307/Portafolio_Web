package com.example.taskme.dto.request.trabajoPrevio;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrabajoPrevioUpdateRequest {
    @NotNull(message = "El id del Trabajo Previo es obligatoria")
    private Long id;

    @JsonProperty(value = "imagen_trabajo")
    private String urlImagen;

    @JsonProperty(value = "titulo_trabajo")
    @Size(min = 4, max = 255, message = "El titulo debe tener entre 4 y 255 caracteres")
    private String titulo;

    @JsonProperty(value = "descripcion_trabajo")
    @Size(max = 750, message = "La descripcion no puede superar los 750 caracteres")
    private String descripcion;
}
