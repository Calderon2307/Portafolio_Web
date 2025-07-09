package com.example.taskme.mapper;

import com.example.taskme.dto.request.trabajoPrevio.TrabajoPrevioRequest;
import com.example.taskme.dto.request.trabajoPrevio.TrabajoPrevioUpdateRequest;
import com.example.taskme.dto.response.trabajoPrevio.TrabajoPrevioResponse;
import com.example.taskme.entities.TrabajoPrevio;
import com.example.taskme.entities.Usuario;

import java.util.List;


public class TrabajoPrevioMapper {

    private TrabajoPrevioMapper() {}

    public static TrabajoPrevio toEntityCreate(TrabajoPrevioRequest req, Usuario usuario) {
        return TrabajoPrevio.builder()
                .usuario(usuario)
                .urlImagen(req.getUrlImagen())
                .titulo(req.getTitulo())
                .descripcion(req.getDescripcion())
                .build();
    }

    public static void toEntityUpdate(
            TrabajoPrevio existente,
            TrabajoPrevioUpdateRequest req
    ) {
        if (req.getUrlImagen() != null) existente.setUrlImagen(req.getUrlImagen());
        if (req.getTitulo() != null) existente.setTitulo(req.getTitulo());
        if (req.getDescripcion() != null) existente.setDescripcion(req.getDescripcion());
    }

    public static TrabajoPrevioResponse toDTO(TrabajoPrevio entidad) {
        return TrabajoPrevioResponse.builder()
                .id(entidad.getId())
                .usuarioId(entidad.getUsuario().getId())
                .urlImagen(entidad.getUrlImagen())
                .titulo(entidad.getTitulo())
                .descripcion(entidad.getDescripcion())
                .fechaPublicacion(entidad.getFechaPublicacion())
                .build();
    }

    public static TrabajoPrevioResponse toSummaryDTO(TrabajoPrevio entidad) {
        return TrabajoPrevioResponse.builder()
                .id(entidad.getId())
                .titulo(entidad.getTitulo())
                .urlImagen(entidad.getUrlImagen())
                .build();
    }

    public static List<TrabajoPrevioResponse> toSummaryDTOList(List<TrabajoPrevio> trabajosPrevios) {
        return trabajosPrevios.stream().map(TrabajoPrevioMapper::toSummaryDTO).toList();
    }
}

