package com.fractal.rh.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "asistencia")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Asistencia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column
    private LocalDate fecha;
    
    @Column(name = "hora_entrada")
    private LocalTime horaEntrada;
    
    @Column(name = "hora_salida")
    private LocalTime horaSalida;
    
    @Column(name = "horas_extras")
    private Double horasExtras;
    
    @Column
    private String estado;
    
    @Column(name = "empleado_id")
    private Long empleadoId;
    
    @Column(name = "nombre_empleado")
    private String nombreEmpleado;
    
    @Column
    private String observaciones;
    
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDate fechaCreacion;
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDate.now();
    }
}
