package com.example.taskme.service;

import com.example.taskme.dto.request.trabajoPrevio.TrabajoPrevioRequest;
import com.example.taskme.dto.request.trabajoPrevio.TrabajoPrevioUpdateRequest;
import com.example.taskme.dto.response.trabajoPrevio.TrabajoPrevioResponse;

import java.util.List;

public interface TrabajoPrevioService {
    //CREATE
    TrabajoPrevioResponse crearTP(TrabajoPrevioRequest request);

    //READ
    TrabajoPrevioResponse getById(Long id);
    List<TrabajoPrevioResponse> getByUsuarioId(Long usuarioId);

    //UPDATE
    TrabajoPrevioResponse updateTP(TrabajoPrevioUpdateRequest request);

    //DELETE
    TrabajoPrevioResponse deleteById(Long id);
}
