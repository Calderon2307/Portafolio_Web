package com.example.taskme.dto.request.resena;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*; // Tengo dudas de esa
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResenaRequest {
    @JsonProperty(value = "cliente_id")
    @NotNull(message = "Debes agregar un ID al cliente")
    private Long idCliente;

    @JsonProperty(value = "tasker_id")
    @NotNull(message = "Es nesesario un identificador")
    private Long idTasker;

    @JsonProperty(value = "comentario_reseña")
    @NotBlank(message = "El comentario no puede estar vacío")
    @Size(min = 2, message = "El comentario debe tener por lo menos 2 caracteres")
    private String comentario;

    @JsonProperty(value = "calificacion_reseña")
    @NotNull(message = "La calificación no puede ser nula")
    @PositiveOrZero(message = "La calificacion no puede ser negativa")
    private Integer calificacion;

}
