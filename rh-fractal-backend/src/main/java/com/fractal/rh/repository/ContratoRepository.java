package com.fractal.rh.repository;

import com.fractal.rh.entity.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Long> {
    List<Contrato> findByEmpleadoId(Long empleadoId);
    List<Contrato> findByEstado(String estado);
    List<Contrato> findByTipoContrato(String tipoContrato);
}
