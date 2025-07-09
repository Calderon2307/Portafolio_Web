package com.example.taskme.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "trabajo_previo")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrabajoPrevio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_categoria", referencedColumnName = "id", nullable = false)
    private Usuario usuario;

    @Column(name = "url_imagen", columnDefinition = "TEXT", nullable = false)
    private String urlImagen;

    @Column(name = "titulo", length = 255, nullable = false)
    private String titulo;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "fecha_publicacion", updatable = false)
    private LocalDateTime fechaPublicacion;

    @PrePersist
    protected void onCreate() {
        this.fechaPublicacion = LocalDateTime.now();
    }
}
