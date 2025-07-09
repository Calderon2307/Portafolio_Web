package com.example.taskme.mapper;

import com.example.taskme.dto.request.ubicacion.UbicacionRequest;
import com.example.taskme.dto.request.ubicacion.UbicacionUpdateRequest;
import com.example.taskme.dto.response.ubicacion.UbicacionResponse;
import com.example.taskme.entities.Ubicacion;
import com.example.taskme.utils.Constants;

import java.util.List;
import java.util.stream.Collectors;

public class UbicacionMapper {

    private UbicacionMapper() {}

    public static Ubicacion toEntityCreate(UbicacionRequest request) {
        boolean esSistema = request.getNombreEstado().equals(Constants.ADMIN_UBICACION) && request.getNombrePais().equals(Constants.ADMIN_UBICACION);
        return Ubicacion.builder()
                .nombrePais(request.getNombrePais())
                .nombreEstado(request.getNombreEstado())
                .esSistema(esSistema)
                .build();
    }

    public static void toEntityUpdate(Ubicacion ubicacion, UbicacionUpdateRequest request) {
        if (request.getNombrePais() != null) ubicacion.setNombrePais(request.getNombrePais());
        if (request.getNombreDepartamento() != null) ubicacion.setNombreEstado(request.getNombreDepartamento());
    }

    public static UbicacionResponse toDTO(Ubicacion ubicacion) {
        return UbicacionResponse.builder()
                .id(ubicacion.getId())
                .nombrePais(ubicacion.getNombrePais())
                .nombreDepartamento(ubicacion.getNombreEstado())
                .build();
    }

    public static List<UbicacionResponse> toDTOList(List<Ubicacion> ubicaciones) {
        return ubicaciones.stream()
                .map(UbicacionMapper::toDTO)
                .toList();
    }

    public static Ubicacion toEntityFromDTO(UbicacionResponse response) {
        return Ubicacion.builder()
                .id(response.getId())
                .nombrePais(response.getNombrePais())
                .nombreEstado(response.getNombreDepartamento())
                .build();
    }

}
