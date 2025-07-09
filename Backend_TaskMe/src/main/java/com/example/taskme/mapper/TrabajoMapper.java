package com.example.taskme.mapper;

import com.example.taskme.dto.request.trabajo.TrabajoRequest;
import com.example.taskme.dto.request.trabajo.TrabajoUpdateRequest;
import com.example.taskme.dto.response.categoria.CategoriaResponse;
import com.example.taskme.dto.response.trabajo.TrabajoResponse;
import com.example.taskme.dto.response.ubicacion.UbicacionResumenDTO;
import com.example.taskme.dto.response.usuario.UsuarioResumenDTO;
import com.example.taskme.entities.Categoria;
import com.example.taskme.entities.Trabajo;
import com.example.taskme.entities.Ubicacion;
import com.example.taskme.entities.Usuario;
import com.example.taskme.entities.enums.EstadoTrabajo;

import java.time.LocalDateTime;
import java.util.List;

public class TrabajoMapper {

    public static Trabajo toEntityCreate(
            TrabajoRequest trabajo,
            Usuario cliente,
            Usuario tasker,
            Categoria categoria,
            Ubicacion ubicacion,
            EstadoTrabajo estado
    ){
        return Trabajo
                .builder()
                .cliente(cliente)
                .tasker(tasker)
                .categoria(categoria)
                .ubicacion(ubicacion)
                .estadoTrabajo(estado)
                .detallesTrabajo(trabajo.getDetallesTrabajo())
                .precioTrabajo(trabajo.getPrecioTrabajo())
                .fechaInicio(trabajo.getFechaInicio())
                .fechaFinalizacion(trabajo.getFechaFin())
                .build();
    }

    public static void toEntityUpdate(
            Trabajo trabajo,
            TrabajoUpdateRequest trabajoUpdate,
            Categoria categoria,
            Ubicacion ubicacion,
            EstadoTrabajo estado
    ){
        if(trabajoUpdate.getCategoria() != null) trabajo.setCategoria(categoria);
        if(trabajoUpdate.getUbicacion() != null) trabajo.setUbicacion(ubicacion);
        if(estado != null) {
            if(estado == EstadoTrabajo.CANCELADO) trabajo.setFechaFinalizacion(LocalDateTime.now());

            trabajo.setEstadoTrabajo(estado);
        }
        if(trabajoUpdate.getDetallesTrabajo() != null) trabajo.setDetallesTrabajo(trabajoUpdate.getDetallesTrabajo());
        if(trabajoUpdate.getPrecioTrabajo() != null) trabajo.setPrecioTrabajo(trabajoUpdate.getPrecioTrabajo());
    }

    public static TrabajoResponse toDTOResponse(
            Trabajo trabajo,
            LocalDateTime fecha
    ){
        return TrabajoResponse
                .builder()
                .id(trabajo.getId())
                .cliente(
                        UsuarioResumenDTO
                                .builder()
                                .id(trabajo.getCliente().getId())
                                .nombre(trabajo.getCliente().getNombre())
                                .fotoPerfil(trabajo.getCliente().getFotoPerfil())
                                .build()
                )
                .tasker(
                        UsuarioResumenDTO
                                .builder()
                                .id(trabajo.getTasker().getId())
                                .nombre(trabajo.getTasker().getNombre())
                                .fotoPerfil(trabajo.getCliente().getFotoPerfil())
                                .build()
                )
                .categoria(
                        CategoriaResponse
                                .builder()
                                .id(trabajo.getCategoria().getId())
                                .nombre(trabajo.getCategoria().getNombre())
                                .imagen(trabajo.getCategoria().getImagen())
                                .build()
                )
                .ubicacion(
                        UbicacionResumenDTO
                                .builder()
                                .id(trabajo.getUbicacion().getId())
                                .nombreDepartamento(trabajo.getUbicacion().getNombreEstado())
                                .build()
                )
                .estadoTrabajo(trabajo.getEstadoTrabajo().toString())
                .detallesTrabajo(trabajo.getDetallesTrabajo())
                .precioTrabajo(trabajo.getPrecioTrabajo())
                .fecha(fecha)
                .build();
    }



    public static TrabajoResponse toDTOResumeResponse(Trabajo trabajo){

        LocalDateTime fecha;

        switch (trabajo.getEstadoTrabajo()) {
            case PENDIENTE -> fecha = trabajo.getFechaCreacion();
            case ACEPTADO -> fecha = trabajo.getFechaInicio();
            case FINALIZADO, CANCELADO -> fecha = trabajo.getFechaFinalizacion();
            default -> fecha = LocalDateTime.now();
        }

        return TrabajoResponse
                .builder()
                .id(trabajo.getId())
                .cliente(
                        UsuarioResumenDTO
                                .builder()
                                .id(trabajo.getCliente().getId())
                                .nombre(trabajo.getCliente().getNombre())
                                .fotoPerfil(trabajo.getCliente().getFotoPerfil())
                                .build()
                )
                .tasker(
                        UsuarioResumenDTO
                                .builder()
                                .id(trabajo.getTasker().getId())
                                .nombre(trabajo.getTasker().getNombre())
                                .fotoPerfil(trabajo.getCliente().getFotoPerfil())
                                .build()
                )
                .categoria(
                        CategoriaResponse
                                .builder()
                                .id(trabajo.getCategoria().getId())
                                .nombre(trabajo.getCategoria().getNombre())
                                .imagen(trabajo.getCategoria().getImagen())
                                .build()
                )
                .estadoTrabajo(trabajo.getEstadoTrabajo().toString())
                .fecha(fecha)
                .build();
    }

//    public static List<TrabajoResponse> toDTOListResponse(List<Trabajo> trabajos){
//        return trabajos
//                .stream()
//                .map(TrabajoMapper::toDTOResponse)
//                .toList();
//    }

    public static List<TrabajoResponse> toDTOResumeListResponse(List<Trabajo> trabajos){
        return trabajos
                .stream()
                .map(TrabajoMapper::toDTOResumeResponse)
                .toList();
    }
}
