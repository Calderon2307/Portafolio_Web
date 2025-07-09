package com.example.taskme.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resenias")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Resena  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "id", nullable = false)
    private Usuario cliente;

    @ManyToOne
    @JoinColumn(name = "id_tasker", referencedColumnName = "id", nullable = false)
    private Usuario tasker;

    @Column(name = "comentario", nullable = false, columnDefinition = "TEXT")
    private String comentario;

    @Column(name = "calificacion", nullable = false)
    private int calificacion;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @PrePersist
    public void setfechaCreacion() {this.fechaCreacion = LocalDateTime.now();}
}