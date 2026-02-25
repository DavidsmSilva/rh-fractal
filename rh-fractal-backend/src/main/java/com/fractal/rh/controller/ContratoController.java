package com.fractal.rh.controller;

import com.fractal.rh.entity.Contrato;
import com.fractal.rh.repository.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contratos")
public class ContratoController {

    @Autowired
    private ContratoRepository contratoRepository;

    @GetMapping
    public List<Contrato> getAllContratos() {
        return contratoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contrato> getContratoById(@PathVariable Long id) {
        Optional<Contrato> contrato = contratoRepository.findById(id);
        return contrato.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Contrato createContrato(@RequestBody Contrato contrato) {
        return contratoRepository.save(contrato);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contrato> updateContrato(@PathVariable Long id, @RequestBody Contrato contratoDetails) {
        Optional<Contrato> contratoData = contratoRepository.findById(id);
        
        if (contratoData.isPresent()) {
            Contrato _contrato = contratoData.get();
            _contrato.setTipoContrato(contratoDetails.getTipoContrato());
            _contrato.setFechaInicio(contratoDetails.getFechaInicio());
            _contrato.setFechaFin(contratoDetails.getFechaFin());
            _contrato.setSalario(contratoDetails.getSalario());
            _contrato.setEstado(contratoDetails.getEstado());
            _contrato.setObservaciones(contratoDetails.getObservaciones());
            return ResponseEntity.ok(contratoRepository.save(_contrato));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContrato(@PathVariable Long id) {
        Optional<Contrato> contrato = contratoRepository.findById(id);
        
        if (contrato.isPresent()) {
            contratoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/empleado/{empleadoId}")
    public List<Contrato> getContratosByEmpleado(@PathVariable Long empleadoId) {
        return contratoRepository.findByEmpleadoId(empleadoId);
    }

    @GetMapping("/estado/{estado}")
    public List<Contrato> getContratosByEstado(@PathVariable String estado) {
        return contratoRepository.findByEstado(estado);
    }
}
