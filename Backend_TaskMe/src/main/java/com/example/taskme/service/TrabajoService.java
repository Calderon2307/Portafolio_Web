package com.example.taskme.service;

import com.example.taskme.dto.request.trabajo.TrabajoRequest;
import com.example.taskme.dto.request.trabajo.TrabajoUpdateRequest;
import com.example.taskme.dto.response.trabajo.TrabajoResponse;
import com.example.taskme.entities.enums.EstadoTrabajo;

import java.util.List;
import java.util.Optional;

public interface TrabajoService {
    //Create
    TrabajoResponse createTrabajo(TrabajoRequest trabajo);

    //Read
    //Generales
    TrabajoResponse getTrabajoById(Long id);
    List<TrabajoResponse> findAll();
    List<TrabajoResponse> findAllXCategoria(Long id);
    List<TrabajoResponse> findAllXEstadoTrabajo(EstadoTrabajo estado);
    List<TrabajoResponse> findAllXUbicacion(Long idUbicacion);
    //Especificos
    List<TrabajoResponse> findAllXCliente(Long idCliente);
    List<TrabajoResponse> findAllXTasker(Long idTasker);
    List<TrabajoResponse> findAllXCategoriaXCliente(Long idCategoria, Long idCliente);
    List<TrabajoResponse> findAllXCategoriaXTasker(Long idCategoria, Long idTasker);
    List<TrabajoResponse> findAllXUbicacionXCliente(Long idUbicacion, Long idCliente);
    List<TrabajoResponse> findAllXUbicacionXTasker(Long idUbicacion, Long idTasker);
    List<TrabajoResponse> findAllXEstadoTrabajoXCliente(EstadoTrabajo estado, Long idCliente);
    List<TrabajoResponse> findAllXEstadoTrabajoXTasker(EstadoTrabajo estado, Long idTasker);

    //Update
    TrabajoResponse updateTrabajo(TrabajoUpdateRequest trabajo);

    //Delete
    TrabajoResponse deletTrabajo(Long id);
}
