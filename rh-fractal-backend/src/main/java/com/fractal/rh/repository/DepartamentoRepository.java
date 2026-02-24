package com.fractal.rh.repository;

import com.fractal.rh.entity.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {
    
    Optional<Departamento> findByCodigo(String codigo);
    
    Optional<Departamento> findByNombre(String nombre);
}
