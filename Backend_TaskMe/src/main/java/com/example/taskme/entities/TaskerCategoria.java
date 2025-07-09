package com.example.taskme.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tasker_x_categoria")
@IdClass(TaskerCategoriaId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskerCategoria {
    @Id
    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Id
    @Column(name = "categoria_id", nullable = false)
    private Long categoriaId;

    @ManyToOne
    @MapsId("usuarioId")
    @JoinColumn(name = "usuario_id", referencedColumnName = "id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @MapsId("categoriaId")
    @JoinColumn(name = "categoria_id", referencedColumnName = "id", nullable = false)
    private Categoria categoria;
}
