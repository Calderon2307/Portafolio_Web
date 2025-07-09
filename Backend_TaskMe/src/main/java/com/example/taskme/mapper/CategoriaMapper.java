package com.example.taskme.mapper;

import com.example.taskme.dto.request.categoria.CategoriaRequest;
import com.example.taskme.dto.request.categoria.CategoriaUpdateRequest;
import com.example.taskme.dto.response.categoria.CategoriaResponse;
import com.example.taskme.dto.response.categoria.CategoriaSummaryResponse;
import com.example.taskme.entities.Categoria;

import java.util.List;

public class CategoriaMapper {

    private CategoriaMapper() {}

    public static Categoria toEntityCreate(CategoriaRequest dto) {
        return Categoria.builder()
                .nombre(dto.getNombre())
                .imagen(dto.getImagen())
                .build();
    }

    public static void toEntityUpdate(Categoria entity, CategoriaUpdateRequest dto) {
        if (dto.getNombre() != null) entity.setNombre(dto.getNombre());
        if (dto.getImagen() != null) entity.setImagen(dto.getImagen());
    }

    public static Categoria toEntityFromDTO(CategoriaResponse resp) {
        return Categoria.builder()
                .id(resp.getId())
                .nombre(resp.getNombre())
                .imagen(resp.getImagen())
                .build();
    }

    public static CategoriaResponse toDTO(Categoria categoria) {
        return CategoriaResponse.builder()
                .id(categoria.getId())
                .nombre(categoria.getNombre())
                .imagen(categoria.getImagen())
                .build();
    }

    public static CategoriaSummaryResponse toDTOSummary(Categoria categoria) {
        return CategoriaSummaryResponse
                .builder()
                .id(categoria.getId())
                .nombre(categoria.getNombre())
                .build();
    }

    public static List<CategoriaSummaryResponse> toDTOSummaryList(List<Categoria> categories) {
        return categories
                .stream()
                .map(CategoriaMapper::toDTOSummary)
                .toList();
    }

    public static List<CategoriaResponse> toDTOList(List<Categoria> categories) {
        return categories.stream()
                .map(CategoriaMapper::toDTO)
                .toList();
    }


}
