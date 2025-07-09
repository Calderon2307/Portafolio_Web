package com.example.taskme.service;

import com.example.taskme.dto.request.resena.ResenaRequest;
import com.example.taskme.dto.response.resena.ResenaResponse;

import java.util.List;

public interface ResenaService {
    //CREATE
    ResenaResponse crearResena(ResenaRequest request);

    //READ
    ResenaResponse obtenerXId(Long id);
    List<ResenaResponse> obtenerResenasXTasker(Long taskerId);
    List<ResenaResponse> obtenerResenasXTaskerYCalficacion(Long taskerId, Integer calificacion);
    List<ResenaResponse> obtenerResenasXCliente(Long clienteId);
    List<ResenaResponse> obtenerPorCalificacion(Integer calificacion);

    //UPDATE NO HAY

    //DELETE
    ResenaResponse eliminarResena(Long id);
}
