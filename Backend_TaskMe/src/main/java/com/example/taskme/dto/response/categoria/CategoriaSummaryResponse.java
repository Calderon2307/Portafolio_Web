package com.example.taskme.dto.response.categoria;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoriaSummaryResponse {
    @JsonProperty(value = "id")
    private Long id;

    @JsonProperty(value = "nombre_categoria")
    private String nombre;
}
