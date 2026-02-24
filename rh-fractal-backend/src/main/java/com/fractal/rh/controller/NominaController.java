package com.fractal.rh.controller;

import com.fractal.rh.entity.Nomina;
import com.fractal.rh.repository.NominaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nominas")
public class NominaController {

    @Autowired
    private NominaRepository nominaRepository;

    @GetMapping
    public List<Nomina> getAllNominas() {
        return nominaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nomina> getNominaById(@PathVariable Long id) {
        return nominaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Nomina createNomina(@RequestBody Nomina nomina) {
        return nominaRepository.save(nomina);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nomina> updateNomina(@PathVariable Long id, @RequestBody Nomina nominaDetails) {
        return nominaRepository.findById(id)
                .map(nomina -> {
                    nomina.setPeriodo(nominaDetails.getPeriodo());
                    nomina.setFechaPago(nominaDetails.getFechaPago());
                    nomina.setTotalDevengado(nominaDetails.getTotalDevengado());
                    nomina.setTotalDeducciones(nominaDetails.getTotalDeducciones());
                    nomina.setTotalNeto(nominaDetails.getTotalNeto());
                    nomina.setEstado(nominaDetails.getEstado());
                    return ResponseEntity.ok(nominaRepository.save(nomina));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNomina(@PathVariable Long id) {
        if (nominaRepository.existsById(id)) {
            nominaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/periodo/{periodo}")
    public List<Nomina> getNominasByPeriodo(@PathVariable String periodo) {
        return nominaRepository.findByPeriodo(periodo);
    }

    @GetMapping("/estado/{estado}")
    public List<Nomina> getNominasByEstado(@PathVariable String estado) {
        return nominaRepository.findByEstado(estado);
    }
}
