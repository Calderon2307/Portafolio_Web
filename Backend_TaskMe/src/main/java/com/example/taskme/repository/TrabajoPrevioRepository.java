package com.example.taskme.repository;

import com.example.taskme.entities.TrabajoPrevio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrabajoPrevioRepository extends JpaRepository<TrabajoPrevio, Long> {
    List<TrabajoPrevio> findAllByUsuario_Id(Long usuarioId);
}
