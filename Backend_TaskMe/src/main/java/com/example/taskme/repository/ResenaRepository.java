package com.example.taskme.repository;

import com.example.taskme.entities.Resena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResenaRepository extends JpaRepository<Resena, Long> {
    List<Resena> findAllByTasker_Id(Long taskerId);
    List<Resena> findAllByTasker_IdAndCalificacionLessThanEqual(Long taskerId, Integer calificacion);
    List<Resena> findAllByCliente_Id(Long clienteId);

    //Para pruebas
    List<Resena> findAllByCalificacionLessThanEqual(Integer calificacion);
}