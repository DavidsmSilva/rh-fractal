package com.fractal.rh;

import com.fractal.rh.entity.*;
import com.fractal.rh.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.jpa.show-sql=false",
    "server.port=0"
})
class DataPersistenceTest {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Autowired
    private NominaRepository nominaRepository;

    @Autowired
    private BeneficioRepository beneficioRepository;

    @Autowired
    private VacacionRepository vacacionRepository;

    @Autowired
    private InventarioEquipoRepository inventarioEquipoRepository;

    @BeforeEach
    void setUp() {
        empleadoRepository.deleteAll();
        departamentoRepository.deleteAll();
        nominaRepository.deleteAll();
        beneficioRepository.deleteAll();
        vacacionRepository.deleteAll();
        inventarioEquipoRepository.deleteAll();
    }

    @Test
    void testPersistir5Empleados() {
        String suffix = UUID.randomUUID().toString().substring(0, 4);
        
        List<Empleado> empleados = List.of(
            Empleado.builder()
                .nombre("Carlos").apellido("Rodriguez").email("carlos.rodriguez.test." + suffix + "@fractal.com")
                .cargo("Desarrollador Senior").departamento("Tecnología")
                .salario(5500000.0).numeroEmpleado("EMP-T-" + suffix + "-001").estado("ACTIVO")
                .fechaContratacion(LocalDate.of(2022, 3, 15))
                .telefonoContacto("3001234567").direccionResidencia("Calle 123 #45-67")
                .ciudadResidencia("Bogotá").paisResidencia("Colombia")
                .tipoContrato("Termo Indefinido").horasSemanales(40)
                .build(),
            Empleado.builder()
                .nombre("Maria").apellido("Garcia").email("maria.garcia.test." + suffix + "@fractal.com")
                .cargo("Diseñadora UX").departamento("Diseño")
                .salario(4800000.0).numeroEmpleado("EMP-T-" + suffix + "-002").estado("ACTIVO")
                .fechaContratacion(LocalDate.of(2023, 1, 10))
                .telefonoContacto("3002345678").direccionResidencia("Carrera 78 #12-34")
                .ciudadResidencia("Medellín").paisResidencia("Colombia")
                .tipoContrato("Termo Indefinido").horasSemanales(40)
                .build(),
            Empleado.builder()
                .nombre("Juan").apellido("Martinez").email("juan.martinez.test." + suffix + "@fractal.com")
                .cargo("Analista de Datos").departamento("Tecnología")
                .salario(5200000.0).numeroEmpleado("EMP-T-" + suffix + "-003").estado("ACTIVO")
                .fechaContratacion(LocalDate.of(2021, 6, 20))
                .telefonoContacto("3003456789").direccionResidencia("Avenida 56 #78-90")
                .ciudadResidencia("Cali").paisResidencia("Colombia")
                .tipoContrato("Termo Indefinido").horasSemanales(40)
                .build(),
            Empleado.builder()
                .nombre("Laura").apellido("Lopez").email("laura.lopez.test." + suffix + "@fractal.com")
                .cargo("Gerente de Proyectos").departamento("Operaciones")
                .salario(7500000.0).numeroEmpleado("EMP-T-" + suffix + "-004").estado("ACTIVO")
                .fechaContratacion(LocalDate.of(2020, 9, 5))
                .telefonoContacto("3004567890").direccionResidencia("Calle 90 #11-22")
                .ciudadResidencia("Bogotá").paisResidencia("Colombia")
                .tipoContrato("Termo Indefinido").horasSemanales(40)
                .build(),
            Empleado.builder()
                .nombre("Pedro").apellido("Sanchez").email("pedro.sanchez.test." + suffix + "@fractal.com")
                .cargo("Soporte Técnico").departamento("Tecnología")
                .salario(3500000.0).numeroEmpleado("EMP-T-" + suffix + "-005").estado("ACTIVO")
                .fechaContratacion(LocalDate.of(2023, 7, 1))
                .telefonoContacto("3005678901").direccionResidencia("Carrera 34 #56-78")
                .ciudadResidencia("Bogotá").paisResidencia("Colombia")
                .tipoContrato("Termo Fijo").horasSemanales(40)
                .build()
        );

        List<Empleado> guardados = empleadoRepository.saveAll(empleados);
        assertEquals(5, guardados.size());
        assertNotNull(guardados.get(0).getId());
        System.out.println("=== 5 EMPLEADOS GUARDADOS ===");
        guardados.forEach(e -> System.out.println("ID: " + e.getId() + " - " + e.getNombre() + " " + e.getApellido() + " - " + e.getCargo()));
    }

    @Test
    void testPersistir5Departamentos() {
        String suffix = UUID.randomUUID().toString().substring(0, 4);
        
        List<Departamento> departamentos = List.of(
            Departamento.builder()
                .nombre("Tecnología-" + suffix).descripcion("Desarrollo de software y sistemas")
                .codigo("TECH-" + suffix).presupuesto(50000000.0).estado("ACTIVO")
                .numeroEmpleados(25).jefe("Director de Tecnología")
                .build(),
            Departamento.builder()
                .nombre("Recursos Humanos-" + suffix).descripcion("Gestión del talento humano")
                .codigo("RH-" + suffix).presupuesto(15000000.0).estado("ACTIVO")
                .numeroEmpleados(8).jefe("Gerente de RRHH")
                .build(),
            Departamento.builder()
                .nombre("Diseño-" + suffix).descripcion("Diseño de experiencias de usuario")
                .codigo("DSG-" + suffix).presupuesto(20000000.0).estado("ACTIVO")
                .numeroEmpleados(12).jefe("Director de Diseño")
                .build(),
            Departamento.builder()
                .nombre("Operaciones-" + suffix).descripcion("Gestión operativa del negocio")
                .codigo("OPR-" + suffix).presupuesto(35000000.0).estado("ACTIVO")
                .numeroEmpleados(15).jefe("Gerente de Operaciones")
                .build(),
            Departamento.builder()
                .nombre("Finanzas-" + suffix).descripcion("Gestión financiera y contable")
                .codigo("FIN-" + suffix).presupuesto(10000000.0).estado("ACTIVO")
                .numeroEmpleados(6).jefe("Director Financiero")
                .build()
        );

        List<Departamento> guardados = departamentoRepository.saveAll(departamentos);
        assertEquals(5, guardados.size());
        assertNotNull(guardados.get(0).getId());
        System.out.println("=== 5 DEPARTAMENTOS GUARDADOS ===");
        guardados.forEach(d -> System.out.println("ID: " + d.getId() + " - " + d.getNombre() + " - Código: " + d.getCodigo()));
    }

    @Test
    void testPersistir5Nominas() {
        String suffix = UUID.randomUUID().toString().substring(0, 4);
        
        List<Nomina> nominas = List.of(
            Nomina.builder()
                .periodo("Enero 2026-" + suffix).periodoNomina("2026-01-" + suffix)
                .fechaPago(LocalDate.of(2026, 1, 31))
                .totalDevengado(5500000.0).totalDeducciones(1100000.0)
                .totalNeto(4400000.0).estado("PAGADA")
                .build(),
            Nomina.builder()
                .periodo("Febrero 2026-" + suffix).periodoNomina("2026-02-" + suffix)
                .fechaPago(LocalDate.of(2026, 2, 28))
                .totalDevengado(5500000.0).totalDeducciones(1100000.0)
                .totalNeto(4400000.0).estado("PAGADA")
                .build(),
            Nomina.builder()
                .periodo("Marzo 2026-" + suffix).periodoNomina("2026-03-" + suffix)
                .fechaPago(LocalDate.of(2026, 3, 31))
                .totalDevengado(5800000.0).totalDeducciones(1160000.0)
                .totalNeto(4640000.0).estado("PAGADA")
                .build(),
            Nomina.builder()
                .periodo("Abril 2026-" + suffix).periodoNomina("2026-04-" + suffix)
                .fechaPago(LocalDate.of(2026, 4, 30))
                .totalDevengado(5800000.0).totalDeducciones(1160000.0)
                .totalNeto(4640000.0).estado("PENDIENTE")
                .build(),
            Nomina.builder()
                .periodo("Mayo 2026-" + suffix).periodoNomina("2026-05-" + suffix)
                .fechaPago(LocalDate.of(2026, 5, 31))
                .totalDevengado(6000000.0).totalDeducciones(1200000.0)
                .totalNeto(4800000.0).estado("PENDIENTE")
                .build()
        );

        List<Nomina> guardados = nominaRepository.saveAll(nominas);
        assertEquals(5, guardados.size());
        assertNotNull(guardados.get(0).getId());
        System.out.println("=== 5 NOMINAS GUARDADAS ===");
        guardados.forEach(n -> System.out.println("ID: " + n.getId() + " - " + n.getPeriodo() + " - Neto: $" + n.getTotalNeto()));
    }

    @Test
    void testPersistir5Beneficios() {
        String suffix = UUID.randomUUID().toString().substring(0, 4);
        
        List<Beneficio> beneficios = List.of(
            Beneficio.builder()
                .nombre("Plan de Salud EPS-" + suffix).descripcion("Cobertura médica integral")
                .valor(850000.0).tipo("Salud").cobertura("Integral")
                .valorMensual(850000.0).fechaInicio(LocalDate.of(2024, 1, 1))
                .estado("ACTIVO")
                .build(),
            Beneficio.builder()
                .nombre("Auxilio de Transporte-" + suffix).descripcion("Auxilio mensual de transporte")
                .valor(150000.0).tipo("Transporte").cobertura("Mensual")
                .valorMensual(150000.0).fechaInicio(LocalDate.of(2024, 1, 1))
                .estado("ACTIVO")
                .build(),
            Beneficio.builder()
                .nombre("Plan de Cesantías-" + suffix).descripcion("Fondo de cesantías")
                .valor(550000.0).tipo("Cesantías").cobertura("Anual")
                .valorMensual(45833.0).fechaInicio(LocalDate.of(2024, 1, 1))
                .estado("ACTIVO")
                .build(),
            Beneficio.builder()
                .nombre("Capacitación Técnica-" + suffix).descripcion("Cursos y certificaciones")
                .valor(2000000.0).tipo("Educación").cobertura("Anual")
                .valorMensual(166666.0).fechaInicio(LocalDate.of(2024, 1, 1))
                .estado("ACTIVO")
                .build(),
            Beneficio.builder()
                .nombre("Seguro de Vida-" + suffix).descripcion("Seguro de vida colectivo")
                .valor(300000.0).tipo("Seguro").cobertura("Anual")
                .valorMensual(25000.0).fechaInicio(LocalDate.of(2024, 1, 1))
                .estado("ACTIVO")
                .build()
        );

        List<Beneficio> guardados = beneficioRepository.saveAll(beneficios);
        assertEquals(5, guardados.size());
        assertNotNull(guardados.get(0).getId());
        System.out.println("=== 5 BENEFICIOS GUARDADOS ===");
        guardados.forEach(b -> System.out.println("ID: " + b.getId() + " - " + b.getNombre() + " - Valor: $" + b.getValor()));
    }

    @Test
    void testPersistir5Vacaciones() {
        String suffix = UUID.randomUUID().toString().substring(0, 4);
        
        List<Vacacion> vacaciones = List.of(
            Vacacion.builder()
                .empleadoId(1L).nombreEmpleado("Carlos Rodriguez-" + suffix)
                .periodoVacacional("2026-01-" + suffix).fechaInicio(LocalDate.of(2026, 2, 1))
                .fechaFin(LocalDate.of(2026, 2, 10)).dias(10).diasTotales(15)
                .estado("APROBADA").fechaSolicitud(LocalDate.of(2026, 1, 15))
                .fechaAprobacion(LocalDate.of(2026, 1, 20))
                .build(),
            Vacacion.builder()
                .empleadoId(2L).nombreEmpleado("Maria Garcia-" + suffix)
                .periodoVacacional("2026-01-" + suffix).fechaInicio(LocalDate.of(2026, 3, 1))
                .fechaFin(LocalDate.of(2026, 3, 8)).dias(8).diasTotales(15)
                .estado("APROBADA").fechaSolicitud(LocalDate.of(2026, 2, 10))
                .fechaAprobacion(LocalDate.of(2026, 2, 15))
                .build(),
            Vacacion.builder()
                .empleadoId(3L).nombreEmpleado("Juan Martinez-" + suffix)
                .periodoVacacional("2026-02-" + suffix).fechaInicio(LocalDate.of(2026, 4, 15))
                .fechaFin(LocalDate.of(2026, 4, 25)).dias(11).diasTotales(15)
                .estado("PENDIENTE").fechaSolicitud(LocalDate.of(2026, 3, 20))
                .build(),
            Vacacion.builder()
                .empleadoId(4L).nombreEmpleado("Laura Lopez-" + suffix)
                .periodoVacacional("2026-01-" + suffix).fechaInicio(LocalDate.of(2026, 5, 1))
                .fechaFin(LocalDate.of(2026, 5, 15)).dias(15).diasTotales(15)
                .estado("APROBADA").fechaSolicitud(LocalDate.of(2026, 4, 1))
                .fechaAprobacion(LocalDate.of(2026, 4, 5))
                .build(),
            Vacacion.builder()
                .empleadoId(5L).nombreEmpleado("Pedro Sanchez-" + suffix)
                .periodoVacacional("2026-02-" + suffix).fechaInicio(LocalDate.of(2026, 6, 1))
                .fechaFin(LocalDate.of(2026, 6, 7)).dias(7).diasTotales(15)
                .estado("PENDIENTE").fechaSolicitud(LocalDate.of(2026, 5, 10))
                .build()
        );

        List<Vacacion> guardados = vacacionRepository.saveAll(vacaciones);
        assertEquals(5, guardados.size());
        assertNotNull(guardados.get(0).getId());
        System.out.println("=== 5 VACACIONES GUARDADAS ===");
        guardados.forEach(v -> System.out.println("ID: " + v.getId() + " - " + v.getNombreEmpleado() + " - Estado: " + v.getEstado()));
    }

    @Test
    void testPersistir5InventarioEquipos() {
        String suffix = UUID.randomUUID().toString().substring(0, 4);
        
        List<InventarioEquipo> equipos = List.of(
            InventarioEquipo.builder()
                .usuario("Carlos Rodriguez-" + suffix).contactoTel("3001234567")
                .cargo("Desarrollador Senior").anydesk("123456789")
                .cuentaCorreo("carlos.test." + suffix + "@fractal.com")
                .ubicacion("Bogotá - Torre Central").serialEquipo("SN-001-T-" + suffix)
                .marca("Dell").modelo("Latitude 5520")
                .procesador("Intel Core i7").nombreEquipo("LAPTOP-CR-T-" + suffix)
                .dueno("Carlos Rodriguez-" + suffix).licenciaOffice("Office 365")
                .windows("Windows 11 Pro").licenciaWindows("OEM")
                .fechaCompra(LocalDate.of(2024, 1, 15)).valor(3500000.0)
                .usuarioWindows("carlos.r").novedades("Equipo en óptimas condiciones")
                .build(),
            InventarioEquipo.builder()
                .usuario("Maria Garcia-" + suffix).contactoTel("3002345678")
                .cargo("Diseñadora UX").anydesk("234567890")
                .cuentaCorreo("maria.test." + suffix + "@fractal.com")
                .ubicacion("Bogotá - Torre Central").serialEquipo("SN-002-T-" + suffix)
                .marca("Apple").modelo("MacBook Pro 14")
                .procesador("M2 Pro").nombreEquipo("LAPTOP-MG-T-" + suffix)
                .dueno("Maria Garcia-" + suffix).licenciaOffice("Office 365")
                .windows("macOS").licenciaWindows("N/A")
                .fechaCompra(LocalDate.of(2024, 2, 20)).valor(5500000.0)
                .usuarioWindows("maria.g").novedades("Equipo nuevo")
                .build(),
            InventarioEquipo.builder()
                .usuario("Juan Martinez-" + suffix).contactoTel("3003456789")
                .cargo("Analista de Datos").anydesk("345678901")
                .cuentaCorreo("juan.test." + suffix + "@fractal.com")
                .ubicacion("Medellín - Oficina Regional").serialEquipo("SN-003-T-" + suffix)
                .marca("Lenovo").modelo("ThinkPad X1 Carbon")
                .procesador("Intel Core i7").nombreEquipo("LAPTOP-JM-T-" + suffix)
                .dueno("Juan Martinez-" + suffix).licenciaOffice("Office 365")
                .windows("Windows 11 Pro").licenciaWindows("OEM")
                .fechaCompra(LocalDate.of(2024, 3, 10)).valor(4200000.0)
                .usuarioWindows("juan.m").novedades("Mantenimiento realizado en enero 2026")
                .build(),
            InventarioEquipo.builder()
                .usuario("Laura Lopez-" + suffix).contactoTel("3004567890")
                .cargo("Gerente de Proyectos").anydesk("456789012")
                .cuentaCorreo("laura.test." + suffix + "@fractal.com")
                .ubicacion("Bogotá - Torre Central").serialEquipo("SN-004-T-" + suffix)
                .marca("Dell").modelo("XPS 15")
                .procesador("Intel Core i9").nombreEquipo("LAPTOP-LL-T-" + suffix)
                .dueno("Laura Lopez-" + suffix).licenciaOffice("Office 365")
                .windows("Windows 11 Pro").licenciaWindows("Retail")
                .fechaCompra(LocalDate.of(2024, 4, 5)).valor(6500000.0)
                .usuarioWindows("laura.l").novedades("Equipo de alta gama")
                .build(),
            InventarioEquipo.builder()
                .usuario("Pedro Sanchez-" + suffix).contactoTel("3005678901")
                .cargo("Soporte Técnico").anydesk("567890123")
                .cuentaCorreo("pedro.test." + suffix + "@fractal.com")
                .ubicacion("Cali - Oficina Regional").serialEquipo("SN-005-T-" + suffix)
                .marca("HP").modelo("EliteBook 840")
                .procesador("Intel Core i5").nombreEquipo("LAPTOP-PS-T-" + suffix)
                .dueno("Pedro Sanchez-" + suffix).licenciaOffice("Office 365")
                .windows("Windows 11 Pro").licenciaWindows("OEM")
                .fechaCompra(LocalDate.of(2024, 5, 1)).valor(2800000.0)
                .usuarioWindows("pedro.s").novedades("Requiere reemplazo de batería")
                .build()
        );

        List<InventarioEquipo> guardados = inventarioEquipoRepository.saveAll(equipos);
        assertEquals(5, guardados.size());
        assertNotNull(guardados.get(0).getId());
        System.out.println("=== 5 INVENTARIOS GUARDADOS ===");
        guardados.forEach(i -> System.out.println("ID: " + i.getId() + " - " + i.getUsuario() + " - " + i.getMarca() + " " + i.getModelo()));
    }
}
