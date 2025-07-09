package com.example.taskme.dto.request.taskercategoria;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskerCategoriaRequest {

    @JsonProperty(value = "usuario_id")
    @NotNull(message = "El ID del tasker es obligatorio")
    private Long usuarioId;

    @JsonProperty(value = "categoria_id")
    @NotNull(message = "El ID de la categoría es obligatorio")
    private Long categoriaId;
}
