package com.fractal.rh.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "vacaciones")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vacacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "empleado_id")
    private Long empleadoId;
    
    @Column(name = "nombre_empleado")
    private String nombreEmpleado;
    
    @Column(name = "periodo_vacacional")
    private String periodoVacacional;
    
    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;
    
    @Column(name = "fecha_fin")
    private LocalDate fechaFin;
    
    @Column
    private Integer dias;
    
    @Column(name = "dias_totales")
    private Integer diasTotales;
    
    @Column(name = "estado")
    private String estado;
    
    @Column(name = "fecha_solicitud")
    private LocalDate fechaSolicitud;
    
    @Column(name = "fecha_aprobacion")
    private LocalDate fechaAprobacion;
    
    @Column(name = "fecha_rechazo")
    private LocalDate fechaRechazo;
    
    @Column(name = "motivo_rechazo")
    private String motivoRechazo;
    
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