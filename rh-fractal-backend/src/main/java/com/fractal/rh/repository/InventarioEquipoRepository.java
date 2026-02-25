package com.fractal.rh.repository;

import com.fractal.rh.entity.InventarioEquipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventarioEquipoRepository extends JpaRepository<InventarioEquipo, Long> {
    List<InventarioEquipo> findByUsuarioContaining(String usuario);
    List<InventarioEquipo> findByCargo(String cargo);
    List<InventarioEquipo> findByUbicacion(String ubicacion);
    List<InventarioEquipo> findByMarca(String marca);
}
