package com.example.taskme.repository;

import com.example.taskme.dto.response.trabajo.TrabajoResponse;
import com.example.taskme.entities.Trabajo;
import com.example.taskme.entities.enums.EstadoTrabajo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrabajoRepository extends JpaRepository<Trabajo, Long> {
    //Generales
    List<Trabajo> findAllByCategoria_Id(Long categoria);
    List<Trabajo> findAllByEstadoTrabajo(EstadoTrabajo estado);
    List<Trabajo> findAllByUbicacion_Id(Long ubicacion);

    //Especificos X Usuario
    List<Trabajo> findAllByCliente_IdOrderByFechaInicioAsc(Long cliente);
    List<Trabajo> findAllByTasker_IdOrderByFechaInicioAsc(Long tasker);
    List<Trabajo> findAllByCategoria_IdAndCliente_IdOrderByFechaInicioAsc(Long categoria, Long cliente);
    List<Trabajo> findAllByCategoria_IdAndTasker_IdOrderByFechaInicioAsc(Long categoria, Long cliente);
    List<Trabajo> findAllByUbicacion_IdAndCliente_IdOrderByFechaInicioAsc(Long ubicacion, Long cliente);
    List<Trabajo> findAllByUbicacion_IdAndTasker_IdOrderByFechaInicioAsc(Long ubicacion, Long tasker);
    List<Trabajo> findAllByEstadoTrabajoAndCliente_IdOrderByFechaInicioAsc(EstadoTrabajo estado, Long cliente);
    List<Trabajo> findAllByEstadoTrabajoAndTasker_IdOrderByFechaInicioAsc(EstadoTrabajo estado, Long tasker);
}
