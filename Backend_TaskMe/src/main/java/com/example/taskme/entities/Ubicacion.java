package com.example.taskme.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ubicaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Ubicacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_pais", nullable = false, length = 150)
    private String nombrePais;

    @Column(name = "nombre_estado", nullable = false, length = 150)
    private String nombreEstado;

    @Column(name = "es_sistema")
    private Boolean esSistema;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @PrePersist
    public void prePersist() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
