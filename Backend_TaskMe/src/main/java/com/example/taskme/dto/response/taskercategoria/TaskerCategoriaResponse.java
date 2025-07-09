package com.example.taskme.dto.response.taskercategoria;

import com.example.taskme.dto.response.categoria.CategoriaResponse;
import com.example.taskme.dto.response.usuario.UsuarioResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskerCategoriaResponse {
    @JsonProperty(value = "tasker")
    private UsuarioResponse tasker;

    @JsonProperty(value = "categoria")
    private CategoriaResponse categoria;
}
