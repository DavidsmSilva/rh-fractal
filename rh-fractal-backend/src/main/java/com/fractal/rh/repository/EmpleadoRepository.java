package com.fractal.rh.repository;

import com.fractal.rh.entity.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    
    Optional<Empleado> findByNumeroEmpleado(String numeroEmpleado);
    
    List<Empleado> findByDepartamento(String departamento);
    
    List<Empleado> findByEstado(String estado);
    
    List<Empleado> findByCargo(String cargo);
    
    Optional<Empleado> findByEmail(String email);
    
    List<Empleado> findByFechaContratacionBetween(LocalDate startDate, LocalDate endDate);
}