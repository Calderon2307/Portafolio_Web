package com.example.taskme.dto.request.ubicacion;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UbicacionRequest {
    @JsonProperty(value = "nombre_pais")
    @NotBlank(message = "El nombre del país no puede estar vacío.")
    @Size(min = 3, max = 150, message = "El nombre del país no debe ser menor a 3 caracteres ni superar los 150 caracteres")
    private String nombrePais;

    @JsonProperty(value = "nombre_estado")
    @NotBlank(message = "El nombre del estado no puede estar vacío.")
    @Size(min = 3, max = 150, message = "El nombre del estado no debe ser menor a 3 caracteres ni superar los 150 caracteres")
    private String nombreEstado;
}

