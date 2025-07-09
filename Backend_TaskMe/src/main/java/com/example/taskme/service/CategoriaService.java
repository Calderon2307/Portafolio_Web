package com.example.taskme.service;

import com.example.taskme.dto.request.categoria.CategoriaRequest;
import com.example.taskme.dto.request.categoria.CategoriaUpdateRequest;
import com.example.taskme.dto.response.categoria.CategoriaResponse;

import java.util.List;

public interface CategoriaService {
    CategoriaResponse create(CategoriaRequest categoria);
    CategoriaResponse findById(Long id);
    CategoriaResponse findByNombre(String nombre);
    List<CategoriaResponse> findAll();
    CategoriaResponse update(CategoriaUpdateRequest dto);
    CategoriaResponse delete(Long id);
}
