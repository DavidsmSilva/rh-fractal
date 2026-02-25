package com.fractal.rh.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "departamentos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Departamento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column
    private String nombre;
    
    @Column
    private String descripcion;
    
    @Column
    private String codigo;
    
    @Column(name = "codigo_departamento")
    private String codigoDepartamento;
    
    @Column(name = "presupuesto")
    private Double presupuesto;
    
    @Column(name = "presupuesto_anual")
    private Double presupuestoAnual;
    
    @Column
    private String jefe;
    
    @Column(name = "jefe_departamento")
    private String jefeDepartamento;
    
    @Column(name = "numero_empleados")
    private Integer numeroEmpleados;
    
    @Column(name = "lista_empleados")
    private String listaEmpleados;
    
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
