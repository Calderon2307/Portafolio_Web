package com.example.taskme.dto.response.trabajoPrevio;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrabajoPrevioResponse {
    private Long id;

    @JsonProperty(value = "usuario_id")
    private Long usuarioId;

    @JsonProperty(value = "imagen_trabajo")
    private String urlImagen;

    @JsonProperty(value = "titulo_trabajo")
    private String titulo;

    @JsonProperty(value = "descripcion_trabajo")
    private String descripcion;

    @JsonProperty(value = "fecha_trabajo")
    private LocalDateTime fechaPublicacion;
}
