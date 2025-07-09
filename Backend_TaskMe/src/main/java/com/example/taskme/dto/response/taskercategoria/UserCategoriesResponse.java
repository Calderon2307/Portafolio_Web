package com.example.taskme.dto.response.taskercategoria;

import com.example.taskme.dto.response.categoria.CategoriaSummaryResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCategoriesResponse {
    @JsonProperty(value = "tasker_id")
    private Long usuarioId;

    @JsonProperty(value = "nombre_tasker")
    private String nombreTasker;

    @JsonProperty(value = "categorias")
    private List<CategoriaSummaryResponse> categorias;
}
