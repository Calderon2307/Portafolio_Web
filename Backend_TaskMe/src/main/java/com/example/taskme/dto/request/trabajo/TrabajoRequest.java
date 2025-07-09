package com.example.taskme.dto.request.trabajo;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TrabajoRequest {
    @JsonProperty(value = "cliente_id")
    @NotNull(message = "Debes proporcionar el ID del cliente")
    private Long cliente;

    @JsonProperty(value = "tasker_id")
    @NotNull(message = "Debes proporcionar el ID del tasker")
    private Long tasker;

    @JsonProperty(value = "categoria_id")
    @NotNull(message = "Debes proporcionar el ID de la categoria")
    private Long categoria;

    @JsonProperty(value = "ubicacion_id")
    @NotNull(message = "Debes proporcionar el ID de la ubicacion")
    private Long ubicacion;

    @JsonProperty(value = "detalles_trabajo")
    @NotBlank(message = "Debes dar detalles sobre el trabajo")
    @Size(max = 500, message = "Los detalles no pueden tener mas de 500 caracteres")
    private String detallesTrabajo;

    @JsonProperty(value = "precio_trabajo")
    @NotNull(message = "Debes fijar un precio al trabajo")
    @PositiveOrZero(message = "El precio no puede ser negativo, pero puede ser cero")
    @Digits(integer = 5,  fraction = 2, message = "El pago debe tener como maximo 5 enteros y 2 decimales (99999.99)")
    private BigDecimal precioTrabajo;

    @JsonProperty(value = "fecha_inicio")
    @NotNull(message = "Debes proporcionar una fecha para el inicio del trabajo")
    @FutureOrPresent(message = "La fecha de inicio no puede ser en pasado")
    private LocalDateTime fechaInicio;

    @JsonProperty(value = "fecha_fin")
    @NotNull(message = "Debes proporcionar una fecha para el fin del trabajo")
    @FutureOrPresent(message = "La fecha de fin no puede ser en pasado")
    private LocalDateTime fechaFin;
}
