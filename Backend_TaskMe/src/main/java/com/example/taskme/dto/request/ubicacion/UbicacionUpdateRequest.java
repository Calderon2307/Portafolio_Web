package com.example.taskme.dto.request.ubicacion;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UbicacionUpdateRequest {
    @NotNull(message = "El id es obligatorio para actualizar")
    private Long id;

    @JsonProperty(value = "nombre_pais")
    @Size(min = 3, max = 100, message = "El nombre del país debe tener entre  y 150 caracteres")
    private String nombrePais;

    @JsonProperty(value = "nombre_estado")
    @Size(min = 3, max = 100, message = "El nombre del estado debe tener entre 3 y 150 caracteres")
    private String nombreDepartamento;
}
