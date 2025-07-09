package com.example.taskme.service;

import com.example.taskme.dto.request.ubicacion.UbicacionRequest;
import com.example.taskme.dto.request.ubicacion.UbicacionUpdateRequest;
import com.example.taskme.dto.response.ubicacion.UbicacionResponse;

import java.util.List;

public interface UbicacionService {
    UbicacionResponse crearUbicacion(UbicacionRequest request);
    UbicacionResponse actualizarUbicacion(UbicacionUpdateRequest request);
    UbicacionResponse obtenerPorId(Long id);
    UbicacionResponse obtenerPorPaisYEstado(String pais, String estado);
    List<UbicacionResponse> obtenerTodosPorPais(String pais);
    List<UbicacionResponse> listarUbicaciones();
    UbicacionResponse eliminarUbicacion(Long id);
}
