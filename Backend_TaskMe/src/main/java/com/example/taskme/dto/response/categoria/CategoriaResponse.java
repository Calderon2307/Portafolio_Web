package com.example.taskme.dto.response.categoria;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaResponse {
    private Long id;

    @JsonProperty(value = "nombre_categoia")
    private String nombre;

    @JsonProperty(value = "imagen_categoria")
    private String imagen;
}
