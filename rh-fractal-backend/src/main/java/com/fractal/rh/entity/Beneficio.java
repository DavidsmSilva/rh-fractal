package com.fractal.rh.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "beneficios")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Beneficio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column
    private String descripcion;
    
    @Column
    private Double valor;
    
    @Column(name = "tipo")
    private String tipo;
    
    @Column(name = "cobertura")
    private String cobertura;
    
    @Column(name = "valor_mensual")
    private Double valorMensual;
    
    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;
    
    @Column(name = "fecha_fin")
    private LocalDate fechaFin;
    
    @Column(name = "estado")
    private String estado;
    
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDate fechaCreacion;
    
    @Column(name = "fecha_actualizacion")
    private LocalDate fechaActualizacion;
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDate.now();
        fechaActualizacion = LocalDate.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDate.now();
    }
}
