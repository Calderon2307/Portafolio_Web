package com.example.taskme.dto.response.taskercategoria;

import com.example.taskme.dto.response.usuario.UsuarioResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryUsersResponse {
    @JsonProperty(value = "categoria_id")
    private Long id;

    @JsonProperty(value = "nombre_categoria")
    private String nombreCategoria;

    @JsonProperty(value = "taskers")
    private List<UsuarioResponse> taskers;

    @JsonProperty(value = "pagina_actual")
    private int paginaActual;

    @JsonProperty(value = "total_paginas")
    private int totalPaginas;

    @JsonProperty(value = "total_taskers")
    private long totalTaskers;
}
