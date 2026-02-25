package com.fractal.rh.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "contratos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contrato {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "tipo_contrato")
    private String tipoContrato;
    
    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;
    
    @Column(name = "fecha_fin")
    private LocalDate fechaFin;
    
    @Column
    private Double salario;
    
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
