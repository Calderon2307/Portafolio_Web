package com.example.taskme.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_ubicacion", referencedColumnName = "id", nullable = false)
    private Ubicacion ubicacion;

    @Column(name = "foto_perfil", columnDefinition = "TEXT")
    private String fotoPerfil;

    @Column(name = "nombre", length = 255, nullable = false)
    private String nombre;

    @Column(name = "correo", columnDefinition = "TEXT", nullable = false, unique = true)
    private String correo;

    @Column(name = "contrasena", columnDefinition = "TEXT", nullable = false)
    private String contrasena;

    @Column(name = "direccion_completa", columnDefinition = "TEXT", nullable = false)
    private String direccionCompleta;

    @Column(name = "es_tasker", nullable = false)
    private Boolean esTasker;

    @Column(name = "es_admin", nullable = false, updatable = false)
    private Boolean esAdmin;

    @Column(name = "telefono", length = 20)
    private String telefono;

    @Column(name = "biografia", columnDefinition = "TEXT")
    private String biografia;

    @Column(name = "fecha_creacion_tasker")
    private LocalDateTime fechaCreacionTasker;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    public void prePersist() {
        if (Boolean.TRUE.equals(esTasker) && fechaCreacionTasker == null) {
            if (fechaCreacion == null) {
                fechaCreacion = LocalDateTime.now();
            }
            fechaCreacionTasker = LocalDateTime.now();
        } else if (fechaCreacion == null) {
            fechaCreacion = LocalDateTime.now();
        }
    }
}
