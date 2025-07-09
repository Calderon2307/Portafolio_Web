package com.example.taskme.service;

import com.example.taskme.dto.request.usuario.UsuarioRequest;
import com.example.taskme.dto.request.usuario.UsuarioUpdateRequest;
import com.example.taskme.dto.response.usuario.UsuarioResponse;

import java.util.List;

public interface UsuarioService {
    //CREATE
    UsuarioResponse createUsuario(UsuarioRequest usuarioCreateRequest);

    //READ
    //Comunes (test)
    List<UsuarioResponse> findAllUsuarios();
    UsuarioResponse findUsuarioById(Long id);

    //TaskMe
    UsuarioResponse findUsuarioByCorreo(String correo);
    List<UsuarioResponse> findAllTaskers();
    List<UsuarioResponse> findTaskerByNombre(String nombre);
    List<UsuarioResponse> findTaskersByUbicacionID(Long ubicacionId);

    //UPDATE
    UsuarioResponse updateUsuario(UsuarioUpdateRequest usuarioUpdateRequest);

    //DELETE
    UsuarioResponse deleteUsuario(Long id);
}
