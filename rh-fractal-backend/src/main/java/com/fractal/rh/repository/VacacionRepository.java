package com.fractal.rh.repository;

import com.fractal.rh.entity.Vacacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VacacionRepository extends JpaRepository<Vacacion, Long> {
    
    List<Vacacion> findByEmpleadoId(Long empleadoId);
    
    List<Vacacion> findByNombreEmpleado(String nombreEmpleado);
    
    List<Vacacion> findByEstado(String estado);
    
    List<Vacacion> findByFechaSolicitudBetween(LocalDate startDate, LocalDate endDate);
}
