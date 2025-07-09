package com.example.taskme.repository;

import com.example.taskme.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreo(String correo);
    Optional<Usuario> findByNombre(String nombre);
    List<Usuario> findAllByEsAdminFalse();
    List<Usuario> findAllByEsTaskerTrueAndEsAdminFalse();
    List<Usuario> findAllByUbicacion_IdAndEsTaskerTrueAndEsAdminFalse(Long ubicacionId);
    List<Usuario> findAllByNombreAndEsTaskerTrueAndEsAdminFalse(String nombre);
    boolean existsByCorreo(String correo);

//    Page<Usuario> findByNombreContainingIgnoreCase(String nombre, Pageable page);
//    Page<Usuario> findByEsTaskerTrue(Pageable page);
}
