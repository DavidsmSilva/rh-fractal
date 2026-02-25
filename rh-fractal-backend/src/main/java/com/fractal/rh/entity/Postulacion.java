package com.fractal.rh.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "postulaciones")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Postulacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column
    private String nombre;
    
    @Column
    private String email;
    
    @Column
    private String telefono;
    
    @Column(name = "cargo_aplicado")
    private String cargoAplicado;
    
    @Column
    private String estado;
    
    @Column(name = "fecha_postulacion")
    private LocalDate fechaPostulacion;
    
    @Column(columnDefinition = "TEXT")
    private String observaciones;
    
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDate fechaCreacion;
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDate.now();
    }
}
