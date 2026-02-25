package com.fractal.rh.repository;

import com.fractal.rh.entity.Asistencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {
    List<Asistencia> findByEmpleadoId(Long empleadoId);
    List<Asistencia> findByFecha(LocalDate fecha);
    List<Asistencia> findByEstado(String estado);
    List<Asistencia> findByEmpleadoIdAndFecha(Long empleadoId, LocalDate fecha);
}
