package com.fractal.rh.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "inventario_equipos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventarioEquipo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "usuario")
    private String usuario;
    
    @Column(name = "contacto_tel")
    private String contactoTel;
    
    @Column
    private String cargo;
    
    @Column
    private String anydesk;
    
    @Column(name = "cuenta_correo")
    private String cuentaCorreo;
    
    @Column
    private String ubicacion;
    
    @Column(name = "serial_equipo")
    private String serialEquipo;
    
    @Column
    private String marca;
    
    @Column
    private String modelo;
    
    @Column
    private String procesador;
    
    @Column(name = "nombre_equipo")
    private String nombreEquipo;
    
    @Column
    private String dueno;
    
    @Column(name = "licencia_office")
    private String licenciaOffice;
    
    @Column
    private String windows;
    
    @Column(name = "licencia_windows")
    private String licenciaWindows;
    
    @Column(name = "fecha_compra")
    private LocalDate fechaCompra;
    
    @Column
    private Double valor;
    
    @Column(name = "usuario_windows")
    private String usuarioWindows;
    
    @Column(name = "pin_windows")
    private String pinWindows;
    
    @Column(columnDefinition = "TEXT")
    private String novedades;
}
