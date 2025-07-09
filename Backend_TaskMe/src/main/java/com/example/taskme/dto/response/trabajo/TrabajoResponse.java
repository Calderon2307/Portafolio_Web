package com.example.taskme.dto.response.trabajo;

import com.example.taskme.dto.response.categoria.CategoriaResponse;
import com.example.taskme.dto.response.ubicacion.UbicacionResumenDTO;
import com.example.taskme.dto.response.usuario.UsuarioResumenDTO;
import com.example.taskme.entities.enums.EstadoTrabajo;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrabajoResponse {
    @JsonProperty(value = "id")
    private Long id;

    @JsonProperty(value = "cliente")
    private UsuarioResumenDTO cliente;

    @JsonProperty(value = "tasker")
    private UsuarioResumenDTO tasker;

    @JsonProperty(value = "categoria")
    private CategoriaResponse categoria;

    @JsonProperty(value = "ubicacion")
    private UbicacionResumenDTO ubicacion;

    @JsonProperty(value = "estado_trabajo")
    private String estadoTrabajo;

    @JsonProperty(value = "detalles_trabajo")
    private String detallesTrabajo;

    @JsonProperty(value = "precio_trabajo")
    private BigDecimal precioTrabajo;

    @JsonProperty(value = "fecha_trabajo")
    private LocalDateTime fecha;
}
