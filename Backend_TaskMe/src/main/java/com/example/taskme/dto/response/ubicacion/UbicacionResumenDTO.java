package com.example.taskme.dto.response.ubicacion;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UbicacionResumenDTO {
    private Long id;

    @JsonProperty(value = "nombre_estado")
    private String nombreDepartamento;
}
