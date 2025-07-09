package com.example.taskme.service.impl;

import com.example.taskme.dto.request.ubicacion.UbicacionRequest;
import com.example.taskme.dto.request.ubicacion.UbicacionUpdateRequest;
import com.example.taskme.dto.response.ubicacion.UbicacionResponse;
import com.example.taskme.entities.Ubicacion;
import com.example.taskme.exception.ubicacion.UbicacionDuplicateException;
import com.example.taskme.exception.ubicacion.UbicacionNotFoundException;
import com.example.taskme.mapper.UbicacionMapper;
import com.example.taskme.repository.UbicacionRepository;
import com.example.taskme.service.UbicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UbicacionServiceImpl implements UbicacionService {

    private final UbicacionRepository ubicacionRepository;

    @Autowired
    public UbicacionServiceImpl(UbicacionRepository ubicacionRepository) {
        this.ubicacionRepository = ubicacionRepository;
    }

    //CREATE
    @Override
    @Transactional
    public UbicacionResponse crearUbicacion(UbicacionRequest request) {
        boolean exists = ubicacionRepository.existsByNombrePaisAndNombreEstado(
                request.getNombrePais().toLowerCase(),
                request.getNombreEstado().toLowerCase()
        );
        if(exists) throw new UbicacionDuplicateException("La ubicacion ya existe.");

        UbicacionRequest castUbicacion = UbicacionRequest.builder()
                .nombrePais(request.getNombrePais().toLowerCase())
                .nombreEstado(request.getNombreEstado().toLowerCase())
                .build();

        return UbicacionMapper.toDTO(ubicacionRepository.save(UbicacionMapper.toEntityCreate(castUbicacion)));
    }

    //READ
    @Override
    public UbicacionResponse obtenerPorId(Long id) {
        return UbicacionMapper.toDTO(ubicacionRepository.findById(id)
                .orElseThrow(() -> new UbicacionNotFoundException("Ubicación no encontrada."))
        );
    }

    @Override
    public UbicacionResponse obtenerPorPaisYEstado(String pais, String estado) {
        return UbicacionMapper.toDTO(ubicacionRepository.findByNombrePaisAndNombreEstadoAndEsSistemaFalse(pais, estado)
                .orElseThrow(() -> new UbicacionNotFoundException("Ubicacion no encontrada."))
        );
    }

    @Override
    public List<UbicacionResponse> obtenerTodosPorPais(String pais) {
        boolean exists = ubicacionRepository.existsByNombrePais(pais);
        if (!exists) throw new UbicacionNotFoundException("El pais no existe.");
        return UbicacionMapper.toDTOList(ubicacionRepository.findAllByNombrePaisAndEsSistemaFalseOrderByNombreEstadoAsc(pais));
    }

    @Override
    public List<UbicacionResponse> listarUbicaciones() { return UbicacionMapper.toDTOList(ubicacionRepository.findAllByEsSistemaFalseOrderByNombreEstadoAsc()); }

    //UPDATE
    @Override
    @Transactional
    public UbicacionResponse actualizarUbicacion(UbicacionUpdateRequest request) {
        Ubicacion ubicacion = ubicacionRepository.findById(request.getId())
                .orElseThrow(() -> new UbicacionNotFoundException("Ubicacion no encontrada."));

        UbicacionUpdateRequest castUbicacion = UbicacionUpdateRequest.builder()
                .nombrePais(request.getNombrePais().toLowerCase())
                .nombreDepartamento(request.getNombreDepartamento().toLowerCase())
                .build();

        UbicacionMapper.toEntityUpdate(ubicacion, castUbicacion);

        return UbicacionMapper.toDTO(ubicacionRepository.save(ubicacion));
    }

    //DELETE
    @Override
    public UbicacionResponse eliminarUbicacion(Long id) {
        Ubicacion ubicacion = ubicacionRepository.findById(id)
                .orElseThrow(() -> new UbicacionNotFoundException("Ubicacion no encontrada."));

        ubicacionRepository.deleteById(id);

        return UbicacionMapper.toDTO(ubicacion);
    }
}
