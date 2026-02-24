package com.fractal.rh.controller;

import com.fractal.rh.entity.InventarioEquipo;
import com.fractal.rh.repository.InventarioEquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventario")
public class InventarioEquipoController {

    @Autowired
    private InventarioEquipoRepository inventarioRepository;

    @GetMapping
    public List<InventarioEquipo> getAllEquipos() {
        return inventarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventarioEquipo> getEquipoById(@PathVariable Long id) {
        Optional<InventarioEquipo> equipo = inventarioRepository.findById(id);
        return equipo.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public InventarioEquipo createEquipo(@RequestBody InventarioEquipo equipo) {
        return inventarioRepository.save(equipo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventarioEquipo> updateEquipo(@PathVariable Long id, @RequestBody InventarioEquipo equipoDetails) {
        Optional<InventarioEquipo> equipoData = inventarioRepository.findById(id);
        
        if (equipoData.isPresent()) {
            InventarioEquipo _equipo = equipoData.get();
            _equipo.setUsuario(equipoDetails.getUsuario());
            _equipo.setContactoTel(equipoDetails.getContactoTel());
            _equipo.setCargo(equipoDetails.getCargo());
            _equipo.setAnydesk(equipoDetails.getAnydesk());
            _equipo.setCuentaCorreo(equipoDetails.getCuentaCorreo());
            _equipo.setUbicacion(equipoDetails.getUbicacion());
            _equipo.setSerialEquipo(equipoDetails.getSerialEquipo());
            _equipo.setMarca(equipoDetails.getMarca());
            _equipo.setModelo(equipoDetails.getModelo());
            _equipo.setProcesador(equipoDetails.getProcesador());
            _equipo.setNombreEquipo(equipoDetails.getNombreEquipo());
            _equipo.setDueno(equipoDetails.getDueno());
            _equipo.setLicenciaOffice(equipoDetails.getLicenciaOffice());
            _equipo.setWindows(equipoDetails.getWindows());
            _equipo.setLicenciaWindows(equipoDetails.getLicenciaWindows());
            _equipo.setFechaCompra(equipoDetails.getFechaCompra());
            _equipo.setValor(equipoDetails.getValor());
            _equipo.setUsuarioWindows(equipoDetails.getUsuarioWindows());
            _equipo.setPinWindows(equipoDetails.getPinWindows());
            _equipo.setNovedades(equipoDetails.getNovedades());
            
            return ResponseEntity.ok(inventarioRepository.save(_equipo));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipo(@PathVariable Long id) {
        Optional<InventarioEquipo> equipo = inventarioRepository.findById(id);
        
        if (equipo.isPresent()) {
            inventarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/usuario/{usuario}")
    public List<InventarioEquipo> getEquiposByUsuario(@PathVariable String usuario) {
        return inventarioRepository.findByUsuarioContaining(usuario);
    }

    @GetMapping("/cargo/{cargo}")
    public List<InventarioEquipo> getEquiposByCargo(@PathVariable String cargo) {
        return inventarioRepository.findByCargo(cargo);
    }

    @GetMapping("/ubicacion/{ubicacion}")
    public List<InventarioEquipo> getEquiposByUbicacion(@PathVariable String ubicacion) {
        return inventarioRepository.findByUbicacion(ubicacion);
    }
}
