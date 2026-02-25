package com.fractal.rh.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "nominas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Nomina {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "periodo")
    private String periodo;
    
    @Column(name = "periodo_nomina")
    private String periodoNomina;
    
    @Column(name = "fecha_pago")
    private LocalDate fechaPago;
    
    @Column(name = "total_devengado")
    private Double totalDevengado;
    
    @Column(name = "total_deducciones")
    private Double totalDeducciones;
    
    @Column(name = "total_neto")
    private Double totalNeto;
    
    @Column(name = "estado")
    private String estado;
    
    @Column(name = "empleado_id")
    private Long empleadoId;
    
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