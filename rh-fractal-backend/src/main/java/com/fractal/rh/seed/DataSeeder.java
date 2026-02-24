package com.fractal.rh.seed;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDate;

import com.fractal.rh.repository.NominaRepository;
import com.fractal.rh.repository.VacacionRepository;
import com.fractal.rh.repository.BeneficioRepository;
import com.fractal.rh.repository.InventarioEquipoRepository;
import com.fractal.rh.entity.Nomina;
import com.fractal.rh.entity.Vacacion;
import com.fractal.rh.entity.Beneficio;
import com.fractal.rh.entity.InventarioEquipo;
@Component
public class DataSeeder implements CommandLineRunner {
  @Autowired
  private JdbcTemplate jdbc;

  // Additional repositories for seeding related data
  @Autowired
  private NominaRepository nominaRepository;

  @Autowired
  private VacacionRepository vacacionRepository;

  @Autowired
  private BeneficioRepository beneficioRepository;

  @Autowired
  private InventarioEquipoRepository inventarioEquipoRepository;

  @Override
  public void run(String... args) throws Exception {
    seedIfNeeded("departamentos");
    seedIfNeeded("empleados");
    seedIfNeeded("nominas");
    seedIfNeeded("vacaciones");
    seedIfNeeded("beneficios");
    seedIfNeeded("inventario_equipos");
  }

  private void seedIfNeeded(String table) {
    try {
      Integer count = jdbc.queryForObject("SELECT COUNT(*) FROM " + table, Integer.class);
      if (count != null && count > 0) return;
    } catch (Exception e) {
      // table not found or other error; skip seeding for this table
      return;
    }
    if ("departamentos".equals(table)) {
      jdbc.execute("INSERT INTO departamentos (nombre, codigo, presupuesto, estado, fecha_creacion) VALUES ('Tecnología','TEC',100000,'ACTIVO',CURRENT_DATE);");
      jdbc.execute("INSERT INTO departamentos (nombre, codigo, presupuesto, estado, fecha_creacion) VALUES ('Recursos Humanos','RH',50000,'ACTIVO',CURRENT_DATE);");
    } else if ("empleados".equals(table)) {
      jdbc.execute("INSERT INTO empleados (nombre, apellido, email, cargo, departamento, salario, numero_empleado, estado, fecha_contratacion, fecha_creacion) VALUES ('Miguel','Soto','miguel.soto@example.com','Analista','Tecnología',52000,'EMP-0001','ACTIVO',CURRENT_DATE,CURRENT_DATE);");
    } else if ("nominas".equals(table)) {
      // Seed a minimal nominal entry via JPA to ensure date fields are populated
      Nomina nomina = Nomina.builder()
              .periodo("2026-02")
              .periodoNomina("2026-02")
              .fechaPago(LocalDate.now())
              .totalDevengado(0.0)
              .totalDeducciones(0.0)
              .totalNeto(0.0)
              .estado("ACTIVO")
              .build();
      nominaRepository.save(nomina);
    } else if ("vacaciones".equals(table)) {
      Vacacion vacacion = Vacacion.builder()
              .empleadoId(1L)
              .nombreEmpleado("Miguel Soto")
              .periodoVacacional("2026-02")
              .dias(5)
              .diasTotales(25)
              .estado("APROBADO")
              .fechaSolicitud(LocalDate.now())
              .build();
      vacacionRepository.save(vacacion);
    } else if ("beneficios".equals(table)) {
      Beneficio beneficio = Beneficio.builder()
              .nombre("Seguro Salud")
              .descripcion("Seguro de salud para empleados")
              .valor(100.0)
              .tipo("Salud")
              .cobertura("Completa")
              .valorMensual(50.0)
              .fechaInicio(LocalDate.now())
              .estado("ACTIVO")
              .build();
      beneficioRepository.save(beneficio);
    } else if ("inventario_equipos".equals(table)) {
      InventarioEquipo equipo = InventarioEquipo.builder()
              .nombreEquipo("Laptop-01")
              .dueno("Miguel Soto")
              .usuario("miguel.soto@example.com")
              .marca("Dell")
              .modelo("Latitude 7400")
              .valor(1200.0)
              .fechaCompra(LocalDate.now())
              .build();
      inventarioEquipoRepository.save(equipo);
    }
  }
}
