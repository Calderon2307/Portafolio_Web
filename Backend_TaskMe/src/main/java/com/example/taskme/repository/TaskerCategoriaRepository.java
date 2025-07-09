package com.example.taskme.repository;

import com.example.taskme.entities.TaskerCategoria;
import com.example.taskme.entities.TaskerCategoriaId;
import com.example.taskme.entities.Categoria;
import com.example.taskme.entities.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskerCategoriaRepository extends JpaRepository<TaskerCategoria, TaskerCategoriaId> {
    @Query("SELECT tc.categoria FROM TaskerCategoria tc WHERE tc.usuario.id = :usuarioId")
    List<Categoria> findCategoriasByUsuarioId(@Param("usuarioId") Long usuarioId);
    @Query("SELECT tc.usuario FROM TaskerCategoria tc WHERE tc.categoria.id = :categoriaId")
    Page<Usuario> findTaskersByCategoriaId(@Param("categoriaId") Long categoriaId, Pageable pageable);

    long countByUsuarioId(Long usuarioId);
}
