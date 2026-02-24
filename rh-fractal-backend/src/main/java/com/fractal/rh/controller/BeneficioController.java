package com.fractal.rh.controller;

import com.fractal.rh.entity.Beneficio;
import com.fractal.rh.repository.BeneficioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beneficios")
public class BeneficioController {

    @Autowired
    private BeneficioRepository beneficioRepository;

    @GetMapping
    public List<Beneficio> getAllBeneficios() {
        return beneficioRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Beneficio> getBeneficioById(@PathVariable Long id) {
        return beneficioRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Beneficio createBeneficio(@RequestBody Beneficio beneficio) {
        return beneficioRepository.save(beneficio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Beneficio> updateBeneficio(@PathVariable Long id, @RequestBody Beneficio beneficioDetails) {
        return beneficioRepository.findById(id)
                .map(beneficio -> {
                    beneficio.setNombre(beneficioDetails.getNombre());
                    beneficio.setDescripcion(beneficioDetails.getDescripcion());
                    beneficio.setTipo(beneficioDetails.getTipo());
                    beneficio.setCobertura(beneficioDetails.getCobertura());
                    beneficio.setValor(beneficioDetails.getValor());
                    beneficio.setValorMensual(beneficioDetails.getValorMensual());
                    beneficio.setFechaInicio(beneficioDetails.getFechaInicio());
                    beneficio.setFechaFin(beneficioDetails.getFechaFin());
                    beneficio.setEstado(beneficioDetails.getEstado());
                    return ResponseEntity.ok(beneficioRepository.save(beneficio));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBeneficio(@PathVariable Long id) {
        if (beneficioRepository.existsById(id)) {
            beneficioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/tipo/{tipo}")
    public List<Beneficio> getBeneficiosByTipo(@PathVariable String tipo) {
        return beneficioRepository.findByTipo(tipo);
    }

    @GetMapping("/estado/{estado}")
    public List<Beneficio> getBeneficiosByEstado(@PathVariable String estado) {
        return beneficioRepository.findByEstado(estado);
    }
}
