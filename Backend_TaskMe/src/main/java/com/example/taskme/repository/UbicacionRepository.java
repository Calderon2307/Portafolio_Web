package com.example.taskme.repository;

import com.example.taskme.entities.Ubicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UbicacionRepository extends JpaRepository<Ubicacion, Long> {
    Optional<Ubicacion> findByNombrePaisAndNombreEstado(String nombrePais, String nombreEstado);
    Optional<Ubicacion> findByNombrePaisAndNombreEstadoAndEsSistemaFalse(String nombrePais, String nombreEstado);
    List<Ubicacion> findAllByNombrePaisAndEsSistemaFalseOrderByNombreEstadoAsc(String nombrePais);
    List<Ubicacion> findAllByEsSistemaFalseOrderByNombreEstadoAsc();
    boolean existsByNombrePaisAndNombreEstado(String nombrePais, String nombreEstado);
    boolean existsByNombrePais(String nombrePais);
}
