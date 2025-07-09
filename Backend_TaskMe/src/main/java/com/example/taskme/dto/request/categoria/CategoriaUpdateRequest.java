package com.example.taskme.dto.request.categoria;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaUpdateRequest {
    @NotNull(message = "Debes proporcionar un ID")
    private  Long id;

    @JsonProperty(value = "nombre_categoria")
    private String nombre;

    @JsonProperty(value = "imagen_categoria")
    private String imagen;
}
