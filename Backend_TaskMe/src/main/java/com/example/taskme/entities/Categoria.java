package com.example.taskme.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categorias")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_categoria", nullable = false)
    private String nombre;

    @Column(name = "imagen_categoria",nullable = false, columnDefinition = "TEXT")
    private String imagen;
}
