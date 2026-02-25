package com.fractal.rh.controller;

import com.fractal.rh.entity.Vacacion;
import com.fractal.rh.repository.VacacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacaciones")
public class VacacionController {

    @Autowired
    private VacacionRepository vacacionRepository;

    @GetMapping
    public List<Vacacion> getAllVacaciones() {
        return vacacionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vacacion> getVacacionById(@PathVariable Long id) {
        return vacacionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Vacacion createVacacion(@RequestBody Vacacion vacacion) {
        return vacacionRepository.save(vacacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vacacion> updateVacacion(@PathVariable Long id, @RequestBody Vacacion vacacionDetails) {
        return vacacionRepository.findById(id)
                .map(vacacion -> {
                    vacacion.setEmpleadoId(vacacionDetails.getEmpleadoId());
                    vacacion.setNombreEmpleado(vacacionDetails.getNombreEmpleado());
                    vacacion.setPeriodoVacacional(vacacionDetails.getPeriodoVacacional());
                    vacacion.setFechaInicio(vacacionDetails.getFechaInicio());
                    vacacion.setFechaFin(vacacionDetails.getFechaFin());
                    vacacion.setDias(vacacionDetails.getDias());
                    vacacion.setDiasTotales(vacacionDetails.getDiasTotales());
                    vacacion.setEstado(vacacionDetails.getEstado());
                    vacacion.setFechaSolicitud(vacacionDetails.getFechaSolicitud());
                    vacacion.setFechaAprobacion(vacacionDetails.getFechaAprobacion());
                    vacacion.setFechaRechazo(vacacionDetails.getFechaRechazo());
                    vacacion.setMotivoRechazo(vacacionDetails.getMotivoRechazo());
                    return ResponseEntity.ok(vacacionRepository.save(vacacion));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVacacion(@PathVariable Long id) {
        if (vacacionRepository.existsById(id)) {
            vacacionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/empleado/{empleadoId}")
    public List<Vacacion> getVacacionesByEmpleado(@PathVariable Long empleadoId) {
        return vacacionRepository.findByEmpleadoId(empleadoId);
    }

    @GetMapping("/estado/{estado}")
    public List<Vacacion> getVacacionesByEstado(@PathVariable String estado) {
        return vacacionRepository.findByEstado(estado);
    }
}
