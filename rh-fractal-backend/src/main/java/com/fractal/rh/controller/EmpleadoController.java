package com.fractal.rh.controller;

import com.fractal.rh.entity.Empleado;
import com.fractal.rh.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @GetMapping
    public List<Empleado> getAllEmpleados() {
        return empleadoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empleado> getEmpleadoById(@PathVariable Long id) {
        Optional<Empleado> empleado = empleadoRepository.findById(id);
        return empleado.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Empleado createEmpleado(@RequestBody Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empleado> updateEmpleado(@PathVariable Long id, @RequestBody Empleado empleadoDetails) {
        Optional<Empleado> empleadoData = empleadoRepository.findById(id);
        
        if (empleadoData.isPresent()) {
            Empleado _empleado = empleadoData.get();
            _empleado.setNombre(empleadoDetails.getNombre());
            _empleado.setApellido(empleadoDetails.getApellido());
            _empleado.setEmail(empleadoDetails.getEmail());
            _empleado.setFechaNacimiento(empleadoDetails.getFechaNacimiento());
            _empleado.setFechaContratacion(empleadoDetails.getFechaContratacion());
            _empleado.setCargo(empleadoDetails.getCargo());
            _empleado.setSalario(empleadoDetails.getSalario());
            _empleado.setNumeroEmpleado(empleadoDetails.getNumeroEmpleado());
            _empleado.setDepartamento(empleadoDetails.getDepartamento());
            _empleado.setEstado(empleadoDetails.getEstado());
            _empleado.setTelefonoContacto(empleadoDetails.getTelefonoContacto());
            _empleado.setDireccionResidencia(empleadoDetails.getDireccionResidencia());
            _empleado.setCiudadResidencia(empleadoDetails.getCiudadResidencia());
            _empleado.setPaisResidencia(empleadoDetails.getPaisResidencia());
            _empleado.setTipoContrato(empleadoDetails.getTipoContrato());
            _empleado.setHorasSemanales(empleadoDetails.getHorasSemanales());
            _empleado.setFechaFinalizacion(empleadoDetails.getFechaFinalizacion());
            _empleado.setMotivoFinalizacion(empleadoDetails.getMotivoFinalizacion());
            _empleado.setBeneficios(empleadoDetails.getBeneficios());
            _empleado.setObservaciones(empleadoDetails.getObservaciones());
            
            return ResponseEntity.ok(empleadoRepository.save(_empleado));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmpleado(@PathVariable Long id) {
        Optional<Empleado> empleado = empleadoRepository.findById(id);
        
        if (empleado.isPresent()) {
            empleadoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/departamento/{departamento}")
    public List<Empleado> getEmpleadosByDepartamento(@PathVariable String departamento) {
        return empleadoRepository.findByDepartamento(departamento);
    }

    @GetMapping("/estado/{estado}")
    public List<Empleado> getEmpleadosByEstado(@PathVariable String estado) {
        return empleadoRepository.findByEstado(estado);
    }

    @GetMapping("/cargo/{cargo}")
    public List<Empleado> getEmpleadosByCargo(@PathVariable String cargo) {
        return empleadoRepository.findByCargo(cargo);
    }

    @GetMapping("/numero/{numero}")
    public ResponseEntity<Empleado> getEmpleadoByNumero(@PathVariable String numero) {
        Optional<Empleado> empleado = empleadoRepository.findByNumeroEmpleado(numero);
        return empleado.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Empleado> getEmpleadoByEmail(@PathVariable String email) {
        Optional<Empleado> empleado = empleadoRepository.findByEmail(email);
        return empleado.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/contratacion/entre/{startDate}/{endDate}")
    public List<Empleado> getEmpleadosByFechaContratacion(
            @PathVariable String startDate, @PathVariable String endDate) {
        return empleadoRepository.findByFechaContratacionBetween(
                java.time.LocalDate.parse(startDate),
                java.time.LocalDate.parse(endDate)
        );
    }
}