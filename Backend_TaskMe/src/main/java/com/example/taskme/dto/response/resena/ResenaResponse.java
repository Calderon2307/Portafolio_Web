package com.example.taskme.dto.response.resena;
import com.example.taskme.dto.response.usuario.UsuarioResumenDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResenaResponse {
    private Long id;

    @JsonProperty(value = "cliente")
    private UsuarioResumenDTO cliente;

    @JsonProperty(value = "tasker")
    private UsuarioResumenDTO tasker;

    @JsonProperty(value = "comentario_reseña")
    private String comentario;

    @JsonProperty(value = "calificacion_reseña")
    private int calificacion;

    @JsonProperty(value = "fecha_creacion")
    private LocalDateTime fechaCreacion;
}
