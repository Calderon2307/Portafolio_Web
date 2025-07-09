package com.example.taskme.dto.response.usuario;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class UsuarioResponse {
    private Long id;

    @JsonProperty(value = "id_ubicacion")
    private Long ubicacionId;

    @JsonProperty(value = "foto_perfil")
    private String fotoPerfil;

    @JsonProperty(value = "nombre_usuario")
    private String nombre;

    @JsonProperty(value = "correo_electronico")
    private String correo;

    @JsonProperty(value = "direccion_completa")
    private String direccionCompleta;

    @JsonProperty(value = "es_tasker")
    private Boolean esTasker;

    @JsonProperty(value = "numero_telefono")
    private String telefono;

    @JsonProperty(value = "tasker_biografia")
    private String biografia;

    @JsonProperty(value = "fecha_creacion_tasker")
    private LocalDateTime fechaCreacionTasker;
}
