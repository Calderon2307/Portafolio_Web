package com.example.taskme.dto.response.usuario;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioResumenDTO {
    private Long   id;

    @JsonProperty(value = "nombre_usuario")
    private String nombre;

    @JsonProperty(value = "foto_perfil")
    private String fotoPerfil;
}
