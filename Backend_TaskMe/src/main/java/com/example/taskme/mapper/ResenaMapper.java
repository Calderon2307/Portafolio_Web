package com.example.taskme.mapper;

import com.example.taskme.dto.request.resena.ResenaRequest;
import com.example.taskme.dto.response.resena.ResenaResponse;
import com.example.taskme.dto.response.usuario.UsuarioResumenDTO;
import com.example.taskme.entities.Resena;
import com.example.taskme.entities.Usuario;

import java.util.List;

public class ResenaMapper {

    public static Resena toEntityCreate(ResenaRequest request, Usuario cliente, Usuario tasker) {
        return Resena.builder()
                .cliente(cliente)
                .tasker(tasker)
                .comentario(request.getComentario())
                .calificacion(request.getCalificacion())
                .build();
    }

    public static ResenaResponse toDTO(Resena resena) {
        return ResenaResponse.builder()
                .id(resena.getId())
                .cliente(UsuarioResumenDTO.builder()
                                .id(resena.getCliente().getId())
                                .nombre(resena.getCliente().getNombre())
                                .fotoPerfil(resena.getCliente().getFotoPerfil())
                                .build()
                )
                .tasker(UsuarioResumenDTO.builder()
                                .id(resena.getTasker().getId())
                                .nombre(resena.getTasker().getNombre())
                                .fotoPerfil(resena.getTasker().getFotoPerfil())
                                .build()
                )
                .comentario(resena.getComentario())
                .calificacion(resena.getCalificacion())
                .fechaCreacion(resena.getFechaCreacion())
                .build();
    }

    public static List<ResenaResponse> toDTOList(List<Resena> resenas) {
        return resenas.stream()
                .map(ResenaMapper::toDTO)
                .toList();
    }
}
