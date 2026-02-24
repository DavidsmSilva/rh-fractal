package com.fractal.rh.repository;

import com.fractal.rh.entity.Nomina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NominaRepository extends JpaRepository<Nomina, Long> {
    
    List<Nomina> findByPeriodo(String periodo);
    
    List<Nomina> findByEstado(String estado);
    
    List<Nomina> findByFechaPagoBetween(LocalDate startDate, LocalDate endDate);
}
