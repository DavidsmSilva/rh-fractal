package com.fractal.rh.controller;

import com.fractal.rh.entity.Departamento;
import com.fractal.rh.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/departamentos")
public class DepartamentoController {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @GetMapping
    public List<Departamento> getAllDepartamentos() {
        return departamentoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Departamento> getDepartamentoById(@PathVariable Long id) {
        Optional<Departamento> departamento = departamentoRepository.findById(id);
        return departamento.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Departamento createDepartamento(@RequestBody Departamento departamento) {
        return departamentoRepository.save(departamento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Departamento> updateDepartamento(@PathVariable Long id, @RequestBody Departamento departamentoDetails) {
        Optional<Departamento> departamentoData = departamentoRepository.findById(id);
        
        if (departamentoData.isPresent()) {
            Departamento _departamento = departamentoData.get();
            _departamento.setNombre(departamentoDetails.getNombre());
            _departamento.setDescripcion(departamentoDetails.getDescripcion());
            _departamento.setCodigo(departamentoDetails.getCodigo());
            _departamento.setPresupuesto(departamentoDetails.getPresupuesto());
            _departamento.setJefe(departamentoDetails.getJefe());
            _departamento.setNumeroEmpleados(departamentoDetails.getNumeroEmpleados());
            _departamento.setEstado(departamentoDetails.getEstado());
            
            return ResponseEntity.ok(departamentoRepository.save(_departamento));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartamento(@PathVariable Long id) {
        Optional<Departamento> departamento = departamentoRepository.findById(id);
        
        if (departamento.isPresent()) {
            departamentoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<Departamento> getDepartamentoByCodigo(@PathVariable String codigo) {
        Optional<Departamento> departamento = departamentoRepository.findByCodigo(codigo);
        return departamento.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
