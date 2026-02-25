package com.fractal.rh.repository;

import com.fractal.rh.entity.Postulacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostulacionRepository extends JpaRepository<Postulacion, Long> {
    List<Postulacion> findByEstado(String estado);
    List<Postulacion> findByCargoAplicado(String cargoAplicado);
}
