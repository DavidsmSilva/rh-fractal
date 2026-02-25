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
import com.fractal.rh.repository.EmpleadoRepository;
import com.fractal.rh.repository.DepartamentoRepository;
import com.fractal.rh.entity.Nomina;
import com.fractal.rh.entity.Vacacion;
import com.fractal.rh.entity.Beneficio;
import com.fractal.rh.entity.InventarioEquipo;
import com.fractal.rh.entity.Empleado;
import com.fractal.rh.entity.Departamento;

@Component
public class DataSeeder implements CommandLineRunner {
  @Autowired
  private JdbcTemplate jdbc;

  @Autowired
  private NominaRepository nominaRepository;

  @Autowired
  private VacacionRepository vacacionRepository;

  @Autowired
  private BeneficioRepository beneficioRepository;

  @Autowired
  private InventarioEquipoRepository inventarioEquipoRepository;

  @Autowired
  private EmpleadoRepository empleadoRepository;

  @Autowired
  private DepartamentoRepository departamentoRepository;

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
      return;
    }
    if ("departamentos".equals(table)) {
      Departamento d1 = Departamento.builder().nombre("Tecnología").codigo("TEC").descripcion("Departamento encargado del desarrollo tecnológico, infraestructura y sistemas de información de la empresa").presupuesto(100000.0).jefe("Miguel Soto").numeroEmpleados(2).listaEmpleados("Miguel Soto, Diego Torres").estado("ACTIVO").build();
      departamentoRepository.save(d1);
      Departamento d2 = Departamento.builder().nombre("Recursos Humanos").codigo("RH").descripcion("Gestión del talento humano, reclutamiento, selección y bienestar laboral").presupuesto(50000.0).jefe("Laura García").numeroEmpleados(2).listaEmpleados("Laura García, María Castaño").estado("ACTIVO").build();
      departamentoRepository.save(d2);
      Departamento d3 = Departamento.builder().nombre("Mercadeo").codigo("MKT").descripcion("Estrategias de marketing, publicidad y comunicación corporativa").presupuesto(75000.0).jefe("Carlos Martínez").numeroEmpleados(2).listaEmpleados("Carlos Martínez, Javier Muñoz").estado("ACTIVO").build();
      departamentoRepository.save(d3);
      Departamento d4 = Departamento.builder().nombre("Finanzas").codigo("FIN").descripcion("Gestión financiera, contabilidad, presupuesto y control de costos").presupuesto(120000.0).jefe("Ana López").numeroEmpleados(2).listaEmpleados("Ana López, Carolina Ruiz").estado("ACTIVO").build();
      departamentoRepository.save(d4);
      Departamento d5 = Departamento.builder().nombre("Operaciones").codigo("OPE").descripcion("Coordinación de procesos operativos y logística de la empresa").presupuesto(90000.0).jefe("Pedro Rodríguez").numeroEmpleados(2).listaEmpleados("Pedro Rodríguez, Andrés Gómez").estado("ACTIVO").build();
      departamentoRepository.save(d5);
      Departamento d6 = Departamento.builder().nombre("Administración").codigo("ADMIN").descripcion("Servicios generales, gestión documental y soporte administrativo").presupuesto(60000.0).jefe("Sofía Hernández").numeroEmpleados(2).listaEmpleados("Sofía Hernández, Valentina Morales").estado("ACTIVO").build();
      departamentoRepository.save(d6);
    } else if ("empleados".equals(table)) {
      Empleado e1 = Empleado.builder().nombre("Miguel").apellido("Soto").email("miguel.soto@example.com").cargo("Gerente de Tecnología").departamento("Tecnología").salario(85000.0).numeroEmpleado("EMP-0001").estado("ACTIVO").rol("Gerente").fechaContratacion(LocalDate.of(2020, 1, 15)).telefonoContacto("3001234567").build();
      Empleado e2 = Empleado.builder().nombre("Laura").apellido("García").email("laura.garcia@example.com").cargo("Directora de Recursos Humanos").departamento("Recursos Humanos").salario(75000.0).numeroEmpleado("EMP-0002").estado("ACTIVO").rol("Directora").fechaContratacion(LocalDate.of(2019, 3, 10)).telefonoContacto("3002345678").build();
      Empleado e3 = Empleado.builder().nombre("Carlos").apellido("Martínez").email("carlos.martinez@example.com").cargo("Coordinador de Mercadeo").departamento("Mercadeo").salario(48000.0).numeroEmpleado("EMP-0003").estado("ACTIVO").rol("Coordinador").fechaContratacion(LocalDate.of(2021, 6, 20)).telefonoContacto("3003456789").build();
      Empleado e4 = Empleado.builder().nombre("Ana").apellido("López").email("ana.lopez@example.com").cargo("Contadora").departamento("Finanzas").salario(55000.0).numeroEmpleado("EMP-0004").estado("ACTIVO").rol("Contador").fechaContratacion(LocalDate.of(2018, 9, 5)).telefonoContacto("3004567890").build();
      Empleado e5 = Empleado.builder().nombre("Pedro").apellido("Rodríguez").email("pedro.rodriguez@example.com").cargo("Supervisor de Operaciones").departamento("Operaciones").salario(45000.0).numeroEmpleado("EMP-0005").estado("ACTIVO").rol("Supervisor").fechaContratacion(LocalDate.of(2020, 11, 1)).telefonoContacto("3005678901").build();
      Empleado e6 = Empleado.builder().nombre("Sofía").apellido("Hernández").email("sofia.hernandez@example.com").cargo("Asistente Administrativa").departamento("Administración").salario(35000.0).numeroEmpleado("EMP-0006").estado("EN_PRUEBA").rol("Asistente").fechaContratacion(LocalDate.of(2025, 1, 10)).telefonoContacto("3006789012").build();
      Empleado e7 = Empleado.builder().nombre("Diego").apellido("Torres").email("diego.torres@example.com").cargo("Desarrollador Full Stack").departamento("Tecnología").salario(62000.0).numeroEmpleado("EMP-0007").estado("ACTIVO").rol("Desarrollador").fechaContratacion(LocalDate.of(2022, 4, 15)).telefonoContacto("3007890123").build();
      Empleado e8 = Empleado.builder().nombre("María").apellido("Castaño").email("maria.castano@example.com").cargo("Analista de Nómina").departamento("Recursos Humanos").salario(42000.0).numeroEmpleado("EMP-0008").estado("ACTIVO").rol("Analista").fechaContratacion(LocalDate.of(2021, 8, 22)).telefonoContacto("3008901234").build();
      Empleado e9 = Empleado.builder().nombre("Javier").apellido("Muñoz").email("javier.munoz@example.com").cargo("Diseñador Gráfico").departamento("Mercadeo").salario(40000.0).numeroEmpleado("EMP-0009").estado("ACTIVO").rol("Diseñador").fechaContratacion(LocalDate.of(2023, 2, 1)).telefonoContacto("3009012345").build();
      Empleado e10 = Empleado.builder().nombre("Carolina").apellido("Ruiz").email("carolina.ruiz@example.com").cargo("Analista Financiero").departamento("Finanzas").salario(50000.0).numeroEmpleado("EMP-0010").estado("ACTIVO").rol("Analista").fechaContratacion(LocalDate.of(2020, 7, 12)).telefonoContacto("3010123456").build();
      Empleado e11 = Empleado.builder().nombre("Andrés").apellido("Gómez").email("andres.gomez@example.com").cargo("Coordinador de Logística").departamento("Operaciones").salario(43000.0).numeroEmpleado("EMP-0011").estado("ACTIVO").rol("Coordinador").fechaContratacion(LocalDate.of(2022, 10, 5)).telefonoContacto("3011234567").build();
      Empleado e12 = Empleado.builder().nombre("Valentina").apellido("Morales").email("valentina.morales@example.com").cargo("Secretaria Ejecutiva").departamento("Administración").salario(32000.0).numeroEmpleado("EMP-0012").estado("ACTIVO").rol("Secretaria").fechaContratacion(LocalDate.of(2024, 3, 18)).telefonoContacto("3012345678").build();
      empleadoRepository.save(e1);
      empleadoRepository.save(e2);
      empleadoRepository.save(e3);
      empleadoRepository.save(e4);
      empleadoRepository.save(e5);
      empleadoRepository.save(e6);
      empleadoRepository.save(e7);
      empleadoRepository.save(e8);
      empleadoRepository.save(e9);
      empleadoRepository.save(e10);
      empleadoRepository.save(e11);
      empleadoRepository.save(e12);
    } else if ("nominas".equals(table)) {
      Nomina n1 = Nomina.builder().empleadoId(1L).periodo("2026-01").periodoNomina("2026-01").fechaPago(LocalDate.of(2026, 1, 31)).totalDevengado(85000.0).totalDeducciones(8500.0).totalNeto(76500.0).estado("PAGADO").build();
      Nomina n2 = Nomina.builder().empleadoId(2L).periodo("2026-01").periodoNomina("2026-01").fechaPago(LocalDate.of(2026, 1, 31)).totalDevengado(75000.0).totalDeducciones(7500.0).totalNeto(67500.0).estado("PAGADO").build();
      Nomina n3 = Nomina.builder().empleadoId(3L).periodo("2026-01").periodoNomina("2026-01").fechaPago(LocalDate.of(2026, 1, 31)).totalDevengado(48000.0).totalDeducciones(4800.0).totalNeto(43200.0).estado("PAGADO").build();
      Nomina n4 = Nomina.builder().empleadoId(4L).periodo("2026-01").periodoNomina("2026-01").fechaPago(LocalDate.of(2026, 1, 31)).totalDevengado(55000.0).totalDeducciones(5500.0).totalNeto(49500.0).estado("PAGADO").build();
      Nomina n5 = Nomina.builder().empleadoId(5L).periodo("2026-01").periodoNomina("2026-01").fechaPago(LocalDate.of(2026, 1, 31)).totalDevengado(45000.0).totalDeducciones(4500.0).totalNeto(40500.0).estado("PAGADO").build();
      Nomina n6 = Nomina.builder().empleadoId(7L).periodo("2026-01").periodoNomina("2026-01").fechaPago(LocalDate.of(2026, 1, 31)).totalDevengado(62000.0).totalDeducciones(6200.0).totalNeto(55800.0).estado("PAGADO").build();
      Nomina n7 = Nomina.builder().empleadoId(1L).periodo("2026-02").periodoNomina("2026-02").fechaPago(LocalDate.now()).totalDevengado(85000.0).totalDeducciones(8500.0).totalNeto(76500.0).estado("PENDIENTE").build();
      Nomina n8 = Nomina.builder().empleadoId(2L).periodo("2026-02").periodoNomina("2026-02").fechaPago(LocalDate.now()).totalDevengado(75000.0).totalDeducciones(7500.0).totalNeto(67500.0).estado("PENDIENTE").build();
      Nomina n9 = Nomina.builder().empleadoId(3L).periodo("2026-02").periodoNomina("2026-02").fechaPago(LocalDate.now()).totalDevengado(48000.0).totalDeducciones(4800.0).totalNeto(43200.0).estado("PENDIENTE").build();
      Nomina n10 = Nomina.builder().empleadoId(4L).periodo("2026-02").periodoNomina("2026-02").fechaPago(LocalDate.now()).totalDevengado(55000.0).totalDeducciones(5500.0).totalNeto(49500.0).estado("PENDIENTE").build();
      nominaRepository.save(n1);
      nominaRepository.save(n2);
      nominaRepository.save(n3);
      nominaRepository.save(n4);
      nominaRepository.save(n5);
      nominaRepository.save(n6);
      nominaRepository.save(n7);
      nominaRepository.save(n8);
      nominaRepository.save(n9);
      nominaRepository.save(n10);
    } else if ("vacaciones".equals(table)) {
      Vacacion v1 = Vacacion.builder().empleadoId(1L).nombreEmpleado("Miguel Soto").periodoVacacional("2026-02").dias(5).diasTotales(25).estado("APROBADO").fechaSolicitud(LocalDate.of(2026, 1, 15)).build();
      Vacacion v2 = Vacacion.builder().empleadoId(2L).nombreEmpleado("Laura García").periodoVacacional("2026-03").dias(10).diasTotales(25).estado("APROBADO").fechaSolicitud(LocalDate.of(2026, 1, 20)).build();
      Vacacion v3 = Vacacion.builder().empleadoId(3L).nombreEmpleado("Carlos Martínez").periodoVacacional("2026-04").dias(7).diasTotales(25).estado("PENDIENTE").fechaSolicitud(LocalDate.of(2026, 2, 1)).build();
      Vacacion v4 = Vacacion.builder().empleadoId(4L).nombreEmpleado("Ana López").periodoVacacional("2026-05").dias(3).diasTotales(25).estado("RECHAZADO").fechaSolicitud(LocalDate.of(2026, 2, 5)).build();
      Vacacion v5 = Vacacion.builder().empleadoId(5L).nombreEmpleado("Pedro Rodríguez").periodoVacacional("2026-06").dias(8).diasTotales(25).estado("PENDIENTE").fechaSolicitud(LocalDate.of(2026, 2, 10)).build();
      Vacacion v6 = Vacacion.builder().empleadoId(7L).nombreEmpleado("Diego Torres").periodoVacacional("2026-07").dias(4).diasTotales(25).estado("APROBADO").fechaSolicitud(LocalDate.of(2026, 2, 15)).build();
      Vacacion v7 = Vacacion.builder().empleadoId(8L).nombreEmpleado("María Castaño").periodoVacacional("2026-08").dias(6).diasTotales(25).estado("PENDIENTE").fechaSolicitud(LocalDate.of(2026, 2, 20)).build();
      Vacacion v8 = Vacacion.builder().empleadoId(9L).nombreEmpleado("Javier Muñoz").periodoVacacional("2026-09").dias(5).diasTotales(25).estado("APROBADO").fechaSolicitud(LocalDate.of(2026, 2, 22)).build();
      Vacacion v9 = Vacacion.builder().empleadoId(10L).nombreEmpleado("Carolina Ruiz").periodoVacacional("2026-10").dias(7).diasTotales(25).estado("PENDIENTE").fechaSolicitud(LocalDate.of(2026, 2, 25)).build();
      Vacacion v10 = Vacacion.builder().empleadoId(11L).nombreEmpleado("Andrés Gómez").periodoVacacional("2026-11").dias(4).diasTotales(25).estado("APROBADO").fechaSolicitud(LocalDate.of(2026, 2, 28)).build();
      vacacionRepository.save(v1);
      vacacionRepository.save(v2);
      vacacionRepository.save(v3);
      vacacionRepository.save(v4);
      vacacionRepository.save(v5);
      vacacionRepository.save(v6);
      vacacionRepository.save(v7);
      vacacionRepository.save(v8);
      vacacionRepository.save(v9);
      vacacionRepository.save(v10);
    } else if ("beneficios".equals(table)) {
      Beneficio b1 = Beneficio.builder().nombre("Seguro Salud").descripcion("Seguro de salud para empleados").valor(100.0).tipo("Salud").cobertura("Completa").valorMensual(50.0).fechaInicio(LocalDate.of(2024, 1, 1)).estado("ACTIVO").build();
      Beneficio b2 = Beneficio.builder().nombre("Bono Alimentación").descripcion("Bono mensual de alimentación").valor(200.0).tipo("Alimentación").cobertura("Completa").valorMensual(200.0).fechaInicio(LocalDate.of(2024, 1, 1)).estado("ACTIVO").build();
      Beneficio b3 = Beneficio.builder().nombre("Auxilio de Transporte").descripcion("Auxilio de transporte mensual").valor(150.0).tipo("Transporte").cobertura("Parcial").valorMensual(150.0).fechaInicio(LocalDate.of(2024, 1, 1)).estado("ACTIVO").build();
      Beneficio b4 = Beneficio.builder().nombre("Plan de Educación").descripcion("Plan de educación y capacitación").valor(500.0).tipo("Educación").cobertura("Completa").valorMensual(300.0).fechaInicio(LocalDate.of(2024, 1, 1)).estado("ACTIVO").build();
      Beneficio b5 = Beneficio.builder().nombre("Seguro de Vida").descripcion("Seguro de vida grupal").valor(80.0).tipo("Seguros").cobertura("Completa").valorMensual(40.0).fechaInicio(LocalDate.of(2024, 1, 1)).estado("ACTIVO").build();
      Beneficio b6 = Beneficio.builder().nombre("Bono de Productividad").descripcion("Bono por cumplimiento de metas").valor(300.0).tipo("Productividad").cobertura("Parcial").valorMensual(0.0).fechaInicio(LocalDate.of(2024, 1, 1)).estado("ACTIVO").build();
      Beneficio b7 = Beneficio.builder().nombre("Día de Cumpleaños").descripcion("Día libre por cumpleaños").valor(0.0).tipo("Bienestar").cobertura("Completa").valorMensual(0.0).fechaInicio(LocalDate.of(2024, 1, 1)).estado("ACTIVO").build();
      Beneficio b8 = Beneficio.builder().nombre("Programa de Wellness").descripcion("Programa de salud y bienestar").valor(120.0).tipo("Bienestar").cobertura("Completa").valorMensual(60.0).fechaInicio(LocalDate.of(2024, 6, 1)).estado("ACTIVO").build();
      Beneficio b9 = Beneficio.builder().nombre("Descuento en Gimnasio").descripcion("Descuento en membresía de gimnasio").valor(60.0).tipo("Bienestar").cobertura("Parcial").valorMensual(30.0).fechaInicio(LocalDate.of(2024, 1, 1)).estado("ACTIVO").build();
      Beneficio b10 = Beneficio.builder().nombre("Cupones de Descuento").descripcion("Cupones de descuento en tiendas aliadas").valor(50.0).tipo("Descuentos").cobertura("Parcial").valorMensual(25.0).fechaInicio(LocalDate.of(2024, 3, 1)).estado("ACTIVO").build();
      beneficioRepository.save(b1);
      beneficioRepository.save(b2);
      beneficioRepository.save(b3);
      beneficioRepository.save(b4);
      beneficioRepository.save(b5);
      beneficioRepository.save(b6);
      beneficioRepository.save(b7);
      beneficioRepository.save(b8);
      beneficioRepository.save(b9);
      beneficioRepository.save(b10);
    } else if ("inventario_equipos".equals(table)) {
      InventarioEquipo eq1 = InventarioEquipo.builder().nombreEquipo("LAPTOP-MIGUEL-01").dueno("Miguel Soto").usuario("miguel.soto@example.com").cargo("Gerente de Tecnología").marca("Apple").modelo("MacBook Pro 16").procesador("M3 Pro").serialEquipo("C02X1234ABCD").ubicacion("Oficina Principal - Piso 3").cuentaCorreo("miguel.soto@fractal.com").anydesk("123456789").licenciaOffice("Microsoft 365").windows("Windows 11 Pro").usuarioWindows("m.soto").pinWindows("1234").fechaCompra(LocalDate.of(2024, 6, 15)).valor(2500.0).novedades("Equipo nuevo en excelente estado").build();
      InventarioEquipo eq2 = InventarioEquipo.builder().nombreEquipo("LAPTOP-LAURA-01").dueno("Laura García").usuario("laura.garcia@example.com").cargo("Directora de RRHH").marca("Dell").modelo("Latitude 7440").procesador("Intel Core i7").serialEquipo("DELL-2024-5678").ubicacion("Oficina Principal - Piso 2").cuentaCorreo("laura.garcia@fractal.com").anydesk("234567890").licenciaOffice("Microsoft 365").windows("Windows 11 Pro").usuarioWindows("l.garcia").pinWindows("2345").fechaCompra(LocalDate.of(2024, 3, 10)).valor(1400.0).novedades("Equipo nuevo").build();
      InventarioEquipo eq3 = InventarioEquipo.builder().nombreEquipo("LAPTOP-CARLOS-01").dueno("Carlos Martínez").usuario("carlos.martinez@example.com").cargo("Coordinador de Mercadeo").marca("HP").modelo("EliteBook 860").procesador("Intel Core i7").serialEquipo("HP-2024-9012").ubicacion("Oficina Principal - Piso 1").cuentaCorreo("carlos.martinez@fractal.com").anydesk("345678901").licenciaOffice("Microsoft 365").windows("Windows 11 Pro").usuarioWindows("c.martinez").pinWindows("3456").fechaCompra(LocalDate.of(2024, 5, 20)).valor(1350.0).novedades("Equipo nuevo").build();
      InventarioEquipo eq4 = InventarioEquipo.builder().nombreEquipo("LAPTOP-ANA-01").dueno("Ana López").usuario("ana.lopez@example.com").cargo("Contadora").marca("Lenovo").modelo("ThinkPad X1 Carbon").procesador("Intel Core i7").serialEquipo("LENOVO-2024-3456").ubicacion("Oficina Principal - Piso 2").cuentaCorreo("ana.lopez@fractal.com").anydesk("456789012").licenciaOffice("Microsoft 365").windows("Windows 11 Pro").usuarioWindows("a.lopez").pinWindows("4567").fechaCompra(LocalDate.of(2024, 2, 28)).valor(1500.0).novedades("Equipo nuevo").build();
      InventarioEquipo eq5 = InventarioEquipo.builder().nombreEquipo("LAPTOP-PEDRO-01").dueno("Pedro Rodríguez").usuario("pedro.rodriguez@example.com").cargo("Supervisor de Operaciones").marca("Dell").modelo("Latitude 5540").procesador("Intel Core i5").serialEquipo("DELL-2024-7890").ubicacion("Bodega Principal").cuentaCorreo("pedro.rodriguez@fractal.com").anydesk("567890123").licenciaOffice("Microsoft 365").windows("Windows 11 Pro").usuarioWindows("p.rodriguez").pinWindows("5678").fechaCompra(LocalDate.of(2024, 4, 12)).valor(1100.0).novedades("Equipo nuevo").build();
      InventarioEquipo eq6 = InventarioEquipo.builder().nombreEquipo("LAPTOP-DIEGO-01").dueno("Diego Torres").usuario("diego.torres@example.com").cargo("Desarrollador Full Stack").marca("Apple").modelo("MacBook Pro 14").procesador("M3").serialEquipo("C02Y5678EFGH").ubicacion("Oficina Principal - Piso 3").cuentaCorreo("diego.torres@fractal.com").anydesk("678901234").licenciaOffice("Microsoft 365").windows("macOS").usuarioWindows("d.torres").pinWindows("6789").fechaCompra(LocalDate.of(2024, 7, 1)).valor(2200.0).novedades("Equipo nuevo de alta gama para desarrollo").build();
      InventarioEquipo eq7 = InventarioEquipo.builder().nombreEquipo("LAPTOP-MARIA-01").dueno("María Castaño").usuario("maria.castano@example.com").cargo("Analista de Nómina").marca("HP").modelo("ProBook 450").procesador("Intel Core i5").serialEquipo("HP-2024-1234").ubicacion("Oficina Principal - Piso 2").cuentaCorreo("maria.castano@fractal.com").anydesk("789012345").licenciaOffice("Microsoft 365").windows("Windows 11 Pro").usuarioWindows("m.castano").pinWindows("7890").fechaCompra(LocalDate.of(2024, 8, 15)).valor(950.0).novedades("Equipo nuevo").build();
      InventarioEquipo eq8 = InventarioEquipo.builder().nombreEquipo("LAPTOP-JAVIER-01").dueno("Javier Muñoz").usuario("javier.munoz@example.com").cargo("Diseñador Gráfico").marca("Apple").modelo("iMac 24").procesador("M3").serialEquipo("C02Z9012IJKL").ubicacion("Oficina Principal - Piso 1").cuentaCorreo("javier.munoz@fractal.com").anydesk("890123456").licenciaOffice("Microsoft 365").windows("macOS").usuarioWindows("j.munoz").pinWindows("8901").fechaCompra(LocalDate.of(2024, 9, 1)).valor(1800.0).novedades("Equipo de diseño con pantalla Retina").build();
      InventarioEquipo eq9 = InventarioEquipo.builder().nombreEquipo("LAPTOP-CAROLINA-01").dueno("Carolina Ruiz").usuario("carolina.ruiz@example.com").cargo("Analista Financiero").marca("Dell").modelo("Precision 3571").procesador("Intel Core i7").serialEquipo("DELL-2024-4567").ubicacion("Oficina Principal - Piso 2").cuentaCorreo("carolina.ruiz@fractal.com").anydesk("901234567").licenciaOffice("Microsoft 365").windows("Windows 11 Pro").usuarioWindows("c.ruiz").pinWindows("9012").fechaCompra(LocalDate.of(2024, 1, 20)).valor(1600.0).novedades("Equipo de alta gama para análisis financiero").build();
      InventarioEquipo eq10 = InventarioEquipo.builder().nombreEquipo("LAPTOP-ANDRES-01").dueno("Andrés Gómez").usuario("andres.gomez@example.com").cargo("Coordinador de Logística").marca("Lenovo").modelo("ThinkPad T14").procesador("Intel Core i5").serialEquipo("LENOVO-2024-8901").ubicacion("Bodega Principal").cuentaCorreo("andres.gomez@fractal.com").anydesk("012345678").licenciaOffice("Microsoft 365").windows("Windows 11 Pro").usuarioWindows("a.gomez").pinWindows("0123").fechaCompra(LocalDate.of(2024, 10, 10)).valor(1050.0).novedades("Equipo nuevo").build();
      InventarioEquipo eq11 = InventarioEquipo.builder().nombreEquipo("DESKTOP-VALENTINA-01").dueno("Valentina Morales").usuario("valentina.morales@example.com").cargo("Secretaria Ejecutiva").marca("Dell").modelo("OptiPlex 7000").procesador("Intel Core i5").serialEquipo("DELL-2024-3333").ubicacion("Oficina Principal - Piso 1").cuentaCorreo("valentina.morales@fractal.com").anydesk("111222333").licenciaOffice("Microsoft 365").windows("Windows 11 Pro").usuarioWindows("v.morales").pinWindows("1111").fechaCompra(LocalDate.of(2024, 11, 5)).valor(800.0).novedades("Equipo de escritorio para tareas administrativas").build();
      InventarioEquipo eq12 = InventarioEquipo.builder().nombreEquipo("MONITOR-ADIC-01").dueno("Varios").usuario("general@fractal.com").cargo("Administración").marca("Samsung").modelo("UltraWide 34").procesador("N/A").serialEquipo("SAM-2024-7777").ubicacion("Sala de Juntas").cuentaCorreo("").anydesk("").licenciaOffice("").windows("").usuarioWindows("").pinWindows("").fechaCompra(LocalDate.of(2024, 4, 1)).valor(450.0).novedades("Monitor panorámico para presentaciones").build();
      inventarioEquipoRepository.save(eq1);
      inventarioEquipoRepository.save(eq2);
      inventarioEquipoRepository.save(eq3);
      inventarioEquipoRepository.save(eq4);
      inventarioEquipoRepository.save(eq5);
      inventarioEquipoRepository.save(eq6);
      inventarioEquipoRepository.save(eq7);
      inventarioEquipoRepository.save(eq8);
      inventarioEquipoRepository.save(eq9);
      inventarioEquipoRepository.save(eq10);
      inventarioEquipoRepository.save(eq11);
      inventarioEquipoRepository.save(eq12);
    }
  }
}
