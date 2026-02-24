package com.fractal.rh.repository;

import com.fractal.rh.entity.Beneficio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BeneficioRepository extends JpaRepository<Beneficio, Long> {
    
    List<Beneficio> findByTipo(String tipo);
    
    List<Beneficio> findByEstado(String estado);
    
    List<Beneficio> findByFechaInicioBetween(LocalDate startDate, LocalDate endDate);
}
