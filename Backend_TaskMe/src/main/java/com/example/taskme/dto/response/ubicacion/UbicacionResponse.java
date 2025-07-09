package com.example.taskme.dto.response.ubicacion;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UbicacionResponse {
    private Long id;

    @JsonProperty(value = "nombre_pais")
    private String nombrePais;

    @JsonProperty(value = "nombre_estado")
    private String nombreDepartamento;
}
