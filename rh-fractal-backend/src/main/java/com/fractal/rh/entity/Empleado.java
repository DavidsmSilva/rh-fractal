package com.fractal.rh.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "empleados")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Empleado {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String apellido;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;
    
    @Column(name = "fecha_contratacion")
    private LocalDate fechaContratacion;
    
    @Column(nullable = false)
    private String cargo;
    
    @Column(nullable = false)
    private Double salario;
    
    @Column(name = "numero_empleado", unique = true, nullable = false)
    private String numeroEmpleado;
    
    @Column(nullable = false)
    private String departamento;
    
    @Column(nullable = false)
    @Builder.Default
    private String estado = "ACTIVO";
    
    @Column(name = "telefono_contacto")
    private String telefonoContacto;
    
    @Column(name = "direccion_residencia")
    private String direccionResidencia;
    
    @Column(name = "ciudad_residencia")
    private String ciudadResidencia;
    
    @Column(name = "pais_residencia")
    private String paisResidencia;
    
    @Column(name = "tipo_contrato")
    private String tipoContrato;
    
    @Column(name = "horas_semanales")
    private Integer horasSemanales;
    
    @Column(name = "fecha_finalizacion")
    private LocalDate fechaFinalizacion;
    
    @Column(name = "motivo_finalizacion")
    private String motivoFinalizacion;
    
    @Column(name = "beneficios")
    private String beneficios;
    
    @Column(name = "observaciones")
    private String observaciones;
    
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