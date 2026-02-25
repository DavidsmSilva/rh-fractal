package com.fractal.rh.controller;

import com.fractal.rh.entity.Postulacion;
import com.fractal.rh.repository.PostulacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/postulaciones")
public class PostulacionController {

    @Autowired
    private PostulacionRepository postulacionRepository;

    @GetMapping
    public List<Postulacion> getAllPostulaciones() {
        return postulacionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Postulacion> getPostulacionById(@PathVariable Long id) {
        Optional<Postulacion> postulacion = postulacionRepository.findById(id);
        return postulacion.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Postulacion createPostulacion(@RequestBody Postulacion postulacion) {
        return postulacionRepository.save(postulacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Postulacion> updatePostulacion(@PathVariable Long id, @RequestBody Postulacion postulacionDetails) {
        Optional<Postulacion> postulacionData = postulacionRepository.findById(id);
        
        if (postulacionData.isPresent()) {
            Postulacion _postulacion = postulacionData.get();
            _postulacion.setNombre(postulacionDetails.getNombre());
            _postulacion.setEmail(postulacionDetails.getEmail());
            _postulacion.setTelefono(postulacionDetails.getTelefono());
            _postulacion.setCargoAplicado(postulacionDetails.getCargoAplicado());
            _postulacion.setEstado(postulacionDetails.getEstado());
            _postulacion.setObservaciones(postulacionDetails.getObservaciones());
            return ResponseEntity.ok(postulacionRepository.save(_postulacion));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePostulacion(@PathVariable Long id) {
        Optional<Postulacion> postulacion = postulacionRepository.findById(id);
        
        if (postulacion.isPresent()) {
            postulacionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/estado/{estado}")
    public List<Postulacion> getPostulacionesByEstado(@PathVariable String estado) {
        return postulacionRepository.findByEstado(estado);
    }

    @GetMapping("/cargo/{cargo}")
    public List<Postulacion> getPostulacionesByCargo(@PathVariable String cargo) {
        return postulacionRepository.findByCargoAplicado(cargo);
    }
}
