package com.example.taskme.mapper;

import com.example.taskme.dto.request.taskercategoria.TaskerCategoriaRequest;
import com.example.taskme.dto.response.categoria.CategoriaResponse;
import com.example.taskme.dto.response.taskercategoria.CategoryUsersResponse;
import com.example.taskme.dto.response.taskercategoria.TaskerCategoriaResponse;
import com.example.taskme.dto.response.taskercategoria.UserCategoriesResponse;
import com.example.taskme.dto.response.usuario.UsuarioResponse;
import com.example.taskme.dto.response.usuario.UsuarioResumenDTO;
import com.example.taskme.entities.Categoria;
import com.example.taskme.entities.TaskerCategoria;
import com.example.taskme.entities.Usuario;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class TaskerCategoriaMapper {

    private TaskerCategoriaMapper() {}

    public static TaskerCategoria toEntityCreate(TaskerCategoriaRequest dto, Usuario tasker, Categoria categoria) {
        return TaskerCategoria
                .builder()
                .categoriaId(dto.getCategoriaId())
                .usuarioId(dto.getUsuarioId())
                .usuario(tasker)
                .categoria(categoria)
                .build();
    }

    public static TaskerCategoriaResponse toDTO(TaskerCategoria entity) {
        return TaskerCategoriaResponse
                .builder()
                .tasker(
                        UsuarioResponse
                                .builder()
                                .id(entity.getUsuario().getId())
                                .nombre(entity.getUsuario().getNombre())
                                .correo(entity.getUsuario().getCorreo())
                                .fechaCreacionTasker(entity.getUsuario().getFechaCreacionTasker())
                                .build()
                )
                .categoria(
                        CategoriaResponse
                                .builder()
                                .id(entity.getCategoria().getId())
                                .nombre(entity.getCategoria().getNombre())
                                .build()
                )
                .build();
    }

    public static UserCategoriesResponse toUserCategoriesDTO(Usuario usuario, List<Categoria> categorias) {
        return UserCategoriesResponse
                .builder()
                .usuarioId(usuario.getId())
                .nombreTasker(usuario.getNombre())
                .categorias(CategoriaMapper.toDTOSummaryList(categorias))
                .build();
    }

    public static List<TaskerCategoriaResponse> toDTOList(List<TaskerCategoria> entities) {
        return entities
                .stream()
                .map(TaskerCategoriaMapper::toDTO)
                .toList();
    }
}
