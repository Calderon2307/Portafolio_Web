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
public class TrabajoUpdateRequest {
    @JsonProperty(value = "id")
    @NotNull(message = "Debes proporcionar el ID")
    private Long id;

    @JsonProperty(value = "categoria_id")
    private Long categoria;

    @JsonProperty(value = "ubicacion_id")
    private Long ubicacion;

    @JsonProperty(value = "estado_trabajo")
    private String estadoTrabajo;

    @JsonProperty(value = "detalles_trabajo")
    private String detallesTrabajo;

    @JsonProperty(value = "precio_trabajo")
    @PositiveOrZero(message = "El precio no puede ser negativo, pero puede ser cero")
    @Digits(integer = 5,  fraction = 2, message = "El pago debe tener como maximo 5 enteros y 2 decimales (99999.99)")
    private BigDecimal precioTrabajo;
}
