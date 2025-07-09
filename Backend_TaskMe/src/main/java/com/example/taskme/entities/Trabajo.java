package com.example.taskme.entities;

import com.example.taskme.entities.enums.EstadoTrabajo;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "trabajos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trabajo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(
            name = "id_cliente",
            referencedColumnName = "id",
            nullable = false
    )
    private Usuario cliente;

    @ManyToOne
    @JoinColumn(
            name = "id_tasker",
            referencedColumnName = "id",
            nullable = false
    )
    private Usuario tasker;

    @ManyToOne
    @JoinColumn(
            name = "id_categoria",
            referencedColumnName = "id",
            nullable = false
    )
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(
            name = "id_ubicacion",
            referencedColumnName = "id",
            nullable = false
    )
    private Ubicacion ubicacion;

    @Column(name = "estado")
    @Enumerated(EnumType.STRING)
    private EstadoTrabajo estadoTrabajo;

    @Column(name = "detalles_extra", columnDefinition = "TEXT", length = 500)
    private String detallesTrabajo;

    @Column(name = "pago", precision = 7, scale = 2)
    private BigDecimal precioTrabajo;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDateTime fechaInicio;

    @Column(name = "fecha_finalizacion")
    private LocalDateTime fechaFinalizacion;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @PrePersist
    public void setFechaCreacion(){
        this.fechaCreacion = LocalDateTime.now();
    }
}