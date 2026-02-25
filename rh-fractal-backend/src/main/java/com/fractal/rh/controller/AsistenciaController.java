package com.fractal.rh.controller;

import com.fractal.rh.entity.Asistencia;
import com.fractal.rh.repository.AsistenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/asistencia")
public class AsistenciaController {

    @Autowired
    private AsistenciaRepository asistenciaRepository;

    @GetMapping
    public List<Asistencia> getAllAsistencia() {
        return asistenciaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asistencia> getAsistenciaById(@PathVariable Long id) {
        Optional<Asistencia> asistencia = asistenciaRepository.findById(id);
        return asistencia.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Asistencia createAsistencia(@RequestBody Asistencia asistencia) {
        return asistenciaRepository.save(asistencia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asistencia> updateAsistencia(@PathVariable Long id, @RequestBody Asistencia asistenciaDetails) {
        Optional<Asistencia> asistenciaData = asistenciaRepository.findById(id);
        
        if (asistenciaData.isPresent()) {
            Asistencia _asistencia = asistenciaData.get();
            _asistencia.setFecha(asistenciaDetails.getFecha());
            _asistencia.setHoraEntrada(asistenciaDetails.getHoraEntrada());
            _asistencia.setHoraSalida(asistenciaDetails.getHoraSalida());
            _asistencia.setHorasExtras(asistenciaDetails.getHorasExtras());
            _asistencia.setEstado(asistenciaDetails.getEstado());
            _asistencia.setObservaciones(asistenciaDetails.getObservaciones());
            return ResponseEntity.ok(asistenciaRepository.save(_asistencia));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsistencia(@PathVariable Long id) {
        Optional<Asistencia> asistencia = asistenciaRepository.findById(id);
        
        if (asistencia.isPresent()) {
            asistenciaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/empleado/{empleadoId}")
    public List<Asistencia> getAsistenciaByEmpleado(@PathVariable Long empleadoId) {
        return asistenciaRepository.findByEmpleadoId(empleadoId);
    }

    @GetMapping("/fecha/{fecha}")
    public List<Asistencia> getAsistenciaByFecha(@PathVariable String fecha) {
        return asistenciaRepository.findByFecha(LocalDate.parse(fecha));
    }

    @GetMapping("/estado/{estado}")
    public List<Asistencia> getAsistenciaByEstado(@PathVariable String estado) {
        return asistenciaRepository.findByEstado(estado);
    }
}
