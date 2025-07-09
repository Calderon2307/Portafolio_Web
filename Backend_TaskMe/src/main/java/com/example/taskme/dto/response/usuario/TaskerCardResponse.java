package com.example.taskme.dto.response.usuario;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskerCardResponse {
    private Long id;

    @JsonProperty(value = "foto_perfil")
    private String fotoPerfil;

    @JsonProperty(value = "nombre_tasker")
    private String nombre;

    @JsonProperty(value = "biografia_tasker")
    private String biografia;

    @JsonProperty(value = "fecha_tasker")
    private LocalDateTime fechaCreacionTasker;
}
