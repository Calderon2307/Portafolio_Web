package com.example.taskme.dto.request.categoria;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaRequest {
    @JsonProperty(value = "nombre_categoria")
    @NotBlank(message = "El nombre de la categoría es obligatorio")
    private String nombre;

    @JsonProperty(value = "imagen_categoria")
    @NotBlank(message = "Debes proporcionar una imagen")
    private String imagen;
}
