package com.fractal.rh.config;

import com.fractal.rh.entity.*;
import com.fractal.rh.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(
            EmpleadoRepository empleadoRepository,
            DepartamentoRepository departamentoRepository,
            BeneficioRepository beneficioRepository,
            NominaRepository nominaRepository,
            VacacionRepository vacacionRepository,
            InventarioEquipoRepository inventarioEquipoRepository) {
        return args -> {
            if (empleadoRepository.count() == 0) {
                System.out.println("=== Cargando datos de prueba ===");
                
                if (departamentoRepository.count() == 0) {
                    departamentoRepository.save(Departamento.builder()
                        .nombre("Tecnología").descripcion("Innovación y desarrollo de software")
                        .codigo("TEC").presupuesto(500000.00).jefe("Juan Pérez")
                        .numeroEmpleados(2).estado("ACTIVO").build());
                    departamentoRepository.save(Departamento.builder()
                        .nombre("Recursos Humanos").descripcion("Gestión de talento y bienestar")
                        .codigo("RH").presupuesto(300000.00).jefe("María Gómez")
                        .numeroEmpleados(1).estado("ACTIVO").build());
                    departamentoRepository.save(Departamento.builder()
                        .nombre("Mercadeo").descripcion("Branding y estrategia comercial")
                        .codigo("MK").presupuesto(250000.00).jefe("Carlos Rodríguez")
                        .numeroEmpleados(1).estado("ACTIVO").build());
                    departamentoRepository.save(Departamento.builder()
                        .nombre("Finanzas").descripcion("Gestión financiera y contable")
                        .codigo("FIN").presupuesto(200000.00).jefe("Ana Martínez")
                        .numeroEmpleados(1).estado("ACTIVO").build());
                    departamentoRepository.save(Departamento.builder()
                        .nombre("Operaciones").descripcion("Gestión operativa del negocio")
                        .codigo("OPR").presupuesto(350000.00).jefe("Pedro Sánchez")
                        .numeroEmpleados(1).estado("ACTIVO").build());
                }

                Empleado emp1 = empleadoRepository.save(Empleado.builder()
                    .nombre("Juan").apellido("Pérez")
                    .email("jperez@fractal.com").numeroEmpleado("EMP-001")
                    .cargo("Desarrollador Senior").departamento("Tecnología")
                    .salario(5500000.00).estado("ACTIVO")
                    .telefonoContacto("3001234567")
                    .direccionResidencia("Calle 123 #45-67")
                    .ciudadResidencia("Medellín").paisResidencia("Colombia")
                    .tipoContrato("Termo Indefinido").horasSemanales(40)
                    .fechaContratacion(LocalDate.of(2023, 3, 15))
                    .fechaNacimiento(LocalDate.of(1990, 5, 20))
                    .build());

                Empleado emp2 = empleadoRepository.save(Empleado.builder()
                    .nombre("María").apellido("Gómez")
                    .email("mgomez@fractal.com").numeroEmpleado("EMP-002")
                    .cargo("Analista de Negocios").departamento("Recursos Humanos")
                    .salario(4200000.00).estado("ACTIVO")
                    .telefonoContacto("3002345678")
                    .direccionResidencia("Carrera 56 #78-90")
                    .ciudadResidencia("Medellín").paisResidencia("Colombia")
                    .tipoContrato("Termo Indefinido").horasSemanales(40)
                    .fechaContratacion(LocalDate.of(2022, 8, 1))
                    .fechaNacimiento(LocalDate.of(1988, 10, 12))
                    .build());

                Empleado emp3 = empleadoRepository.save(Empleado.builder()
                    .nombre("Carlos").apellido("Rodríguez")
                    .email("crodriguez@fractal.com").numeroEmpleado("EMP-003")
                    .cargo("Diseñador UX").departamento("Mercadeo")
                    .salario(3800000.00).estado("ACTIVO")
                    .telefonoContacto("3003456789")
                    .direccionResidencia("Avenida 30 #12-34")
                    .ciudadResidencia("Medellín").paisResidencia("Colombia")
                    .tipoContrato("Termo Fijo").horasSemanales(40)
                    .fechaContratacion(LocalDate.of(2024, 1, 10))
                    .fechaNacimiento(LocalDate.of(1995, 3, 25))
                    .build());

                Empleado emp4 = empleadoRepository.save(Empleado.builder()
                    .nombre("Ana").apellido("Martínez")
                    .email("amartinez@fractal.com").numeroEmpleado("EMP-004")
                    .cargo("Contadora").departamento("Finanzas")
                    .salario(4500000.00).estado("ACTIVO")
                    .telefonoContacto("3004567890")
                    .direccionResidencia("Calle 78 #90-12")
                    .ciudadResidencia("Medellín").paisResidencia("Colombia")
                    .tipoContrato("Termo Indefinido").horasSemanales(40)
                    .fechaContratacion(LocalDate.of(2021, 6, 15))
                    .fechaNacimiento(LocalDate.of(1985, 8, 30))
                    .build());

                Empleado emp5 = empleadoRepository.save(Empleado.builder()
                    .nombre("Luis").apellido("Fernández")
                    .email("lfernandez@fractal.com").numeroEmpleado("EMP-005")
                    .cargo("Desarrollador Junior").departamento("Tecnología")
                    .salario(2800000.00).estado("ACTIVO")
                    .telefonoContacto("3005678901")
                    .direccionResidencia("Carrera 45 #67-89")
                    .ciudadResidencia("Medellín").paisResidencia("Colombia")
                    .tipoContrato("Aprendizaje").horasSemanales(40)
                    .fechaContratacion(LocalDate.of(2025, 1, 5))
                    .fechaNacimiento(LocalDate.of(1998, 12, 10))
                    .build());

                if (beneficioRepository.count() == 0) {
                    beneficioRepository.save(Beneficio.builder()
                        .nombre("Plan de Salud").descripcion("Cobertura médica integral")
                        .tipo("Salud").cobertura("Empleado + Familia")
                        .valorMensual(150000.00).estado("ACTIVO").build());
                    beneficioRepository.save(Beneficio.builder()
                        .nombre("Auxilio de Transporte").descripcion("Subsidio de transporte")
                        .tipo("Transporte").cobertura("Todos los empleados")
                        .valorMensual(80000.00).estado("ACTIVO").build());
                    beneficioRepository.save(Beneficio.builder()
                        .nombre("Capacitación").descripcion("Programas de desarrollo profesional")
                        .tipo("Desarrollo").cobertura("Todos los empleados")
                        .valorMensual(250000.00).estado("ACTIVO").build());
                    beneficioRepository.save(Beneficio.builder()
                        .nombre("Seguro de Vida").descripcion("Seguro de vida colectivo")
                        .tipo("Seguro").cobertura("Empleado + Familia")
                        .valorMensual(50000.00).estado("ACTIVO").build());
                    beneficioRepository.save(Beneficio.builder()
                        .nombre("Auxilio de Alimentación").descripcion("Bono de alimentación")
                        .tipo("Alimentación").cobertura("Todos los empleados")
                        .valorMensual(120000.00).estado("ACTIVO").build());
                }

                if (nominaRepository.count() == 0) {
                    nominaRepository.save(Nomina.builder()
                        .periodo("Enero 2026").periodoNomina("2026-01")
                        .fechaPago(LocalDate.of(2026, 1, 31))
                        .totalDevengado(5500000.00).totalDeducciones(1100000.00)
                        .totalNeto(4400000.00).estado("PAGADA").build());
                    nominaRepository.save(Nomina.builder()
                        .periodo("Febrero 2026").periodoNomina("2026-02")
                        .fechaPago(LocalDate.of(2026, 2, 28))
                        .totalDevengado(5500000.00).totalDeducciones(1100000.00)
                        .totalNeto(4400000.00).estado("PAGADA").build());
                    nominaRepository.save(Nomina.builder()
                        .periodo("Marzo 2026").periodoNomina("2026-03")
                        .fechaPago(LocalDate.of(2026, 3, 31))
                        .totalDevengado(5800000.00).totalDeducciones(1160000.00)
                        .totalNeto(4640000.00).estado("PAGADA").build());
                    nominaRepository.save(Nomina.builder()
                        .periodo("Abril 2026").periodoNomina("2026-04")
                        .fechaPago(LocalDate.of(2026, 4, 30))
                        .totalDevengado(5800000.00).totalDeducciones(1160000.00)
                        .totalNeto(4640000.00).estado("PENDIENTE").build());
                    nominaRepository.save(Nomina.builder()
                        .periodo("Mayo 2026").periodoNomina("2026-05")
                        .fechaPago(LocalDate.of(2026, 5, 31))
                        .totalDevengado(6000000.00).totalDeducciones(1200000.00)
                        .totalNeto(4800000.00).estado("PENDIENTE").build());
                }

                if (vacacionRepository.count() == 0) {
                    vacacionRepository.save(Vacacion.builder()
                        .empleadoId(emp1.getId()).nombreEmpleado("Juan Pérez")
                        .periodoVacacional("2026-01").fechaInicio(LocalDate.of(2026, 2, 1))
                        .fechaFin(LocalDate.of(2026, 2, 10)).dias(10).diasTotales(15)
                        .estado("APROBADA").fechaSolicitud(LocalDate.of(2026, 1, 15))
                        .fechaAprobacion(LocalDate.of(2026, 1, 20)).build());
                    vacacionRepository.save(Vacacion.builder()
                        .empleadoId(emp2.getId()).nombreEmpleado("María Gómez")
                        .periodoVacacional("2026-01").fechaInicio(LocalDate.of(2026, 3, 1))
                        .fechaFin(LocalDate.of(2026, 3, 8)).dias(8).diasTotales(15)
                        .estado("APROBADA").fechaSolicitud(LocalDate.of(2026, 2, 10))
                        .fechaAprobacion(LocalDate.of(2026, 2, 15)).build());
                    vacacionRepository.save(Vacacion.builder()
                        .empleadoId(emp3.getId()).nombreEmpleado("Carlos Rodríguez")
                        .periodoVacacional("2026-02").fechaInicio(LocalDate.of(2026, 4, 15))
                        .fechaFin(LocalDate.of(2026, 4, 25)).dias(11).diasTotales(15)
                        .estado("PENDIENTE").fechaSolicitud(LocalDate.of(2026, 3, 20)).build());
                    vacacionRepository.save(Vacacion.builder()
                        .empleadoId(emp4.getId()).nombreEmpleado("Ana Martínez")
                        .periodoVacacional("2026-01").fechaInicio(LocalDate.of(2026, 5, 1))
                        .fechaFin(LocalDate.of(2026, 5, 15)).dias(15).diasTotales(15)
                        .estado("APROBADA").fechaSolicitud(LocalDate.of(2026, 4, 1))
                        .fechaAprobacion(LocalDate.of(2026, 4, 5)).build());
                    vacacionRepository.save(Vacacion.builder()
                        .empleadoId(emp5.getId()).nombreEmpleado("Luis Fernández")
                        .periodoVacacional("2026-02").fechaInicio(LocalDate.of(2026, 6, 1))
                        .fechaFin(LocalDate.of(2026, 6, 7)).dias(7).diasTotales(15)
                        .estado("PENDIENTE").fechaSolicitud(LocalDate.of(2026, 5, 10)).build());
                }

                if (inventarioEquipoRepository.count() == 0) {
                    inventarioEquipoRepository.save(InventarioEquipo.builder()
                        .usuario("Juan Pérez").contactoTel("3001234567")
                        .cargo("Desarrollador Senior").anydesk("123456789")
                        .cuentaCorreo("jperez@fractal.com")
                        .ubicacion("Medellín - Oficina Central").serialEquipo("SN-001-2024")
                        .marca("Dell").modelo("Latitude 5520")
                        .procesador("Intel Core i7").nombreEquipo("LAPTOP-JP-001")
                        .dueno("Juan Pérez").licenciaOffice("Office 365")
                        .windows("Windows 11 Pro").licenciaWindows("OEM")
                        .fechaCompra(LocalDate.of(2024, 1, 15)).valor(3500000.00)
                        .usuarioWindows("juan.p").novedades("Equipo en óptimas condiciones").build());
                    inventarioEquipoRepository.save(InventarioEquipo.builder()
                        .usuario("María Gómez").contactoTel("3002345678")
                        .cargo("Analista de Negocios").anydesk("234567890")
                        .cuentaCorreo("mgomez@fractal.com")
                        .ubicacion("Medellín - Oficina Central").serialEquipo("SN-002-2024")
                        .marca("Apple").modelo("MacBook Pro 14")
                        .procesador("M2 Pro").nombreEquipo("LAPTOP-MG-001")
                        .dueno("María Gómez").licenciaOffice("Office 365")
                        .windows("macOS").licenciaWindows("N/A")
                        .fechaCompra(LocalDate.of(2024, 2, 20)).valor(5500000.00)
                        .usuarioWindows("maria.g").novedades("Equipo nuevo").build());
                    inventarioEquipoRepository.save(InventarioEquipo.builder()
                        .usuario("Carlos Rodríguez").contactoTel("3003456789")
                        .cargo("Diseñador UX").anydesk("345678901")
                        .cuentaCorreo("crodriguez@fractal.com")
                        .ubicacion("Bogotá - Oficina Regional").serialEquipo("SN-003-2024")
                        .marca("Lenovo").modelo("ThinkPad X1 Carbon")
                        .procesador("Intel Core i7").nombreEquipo("LAPTOP-CR-001")
                        .dueno("Carlos Rodríguez").licenciaOffice("Office 365")
                        .windows("Windows 11 Pro").licenciaWindows("OEM")
                        .fechaCompra(LocalDate.of(2024, 3, 10)).valor(4200000.00)
                        .usuarioWindows("carlos.r").novedades("Mantenimiento realizado").build());
                    inventarioEquipoRepository.save(InventarioEquipo.builder()
                        .usuario("Ana Martínez").contactoTel("3004567890")
                        .cargo("Contadora").anydesk("456789012")
                        .cuentaCorreo("amartinez@fractal.com")
                        .ubicacion("Medellín - Oficina Central").serialEquipo("SN-004-2024")
                        .marca("Dell").modelo("XPS 15")
                        .procesador("Intel Core i9").nombreEquipo("LAPTOP-AM-001")
                        .dueno("Ana Martínez").licenciaOffice("Office 365")
                        .windows("Windows 11 Pro").licenciaWindows("Retail")
                        .fechaCompra(LocalDate.of(2024, 4, 5)).valor(6500000.00)
                        .usuarioWindows("ana.m").novedades("Equipo de alta gama").build());
                    inventarioEquipoRepository.save(InventarioEquipo.builder()
                        .usuario("Luis Fernández").contactoTel("3005678901")
                        .cargo("Desarrollador Junior").anydesk("567890123")
                        .cuentaCorreo("lfernandez@fractal.com")
                        .ubicacion("Cali - Oficina Regional").serialEquipo("SN-005-2024")
                        .marca("HP").modelo("EliteBook 840")
                        .procesador("Intel Core i5").nombreEquipo("LAPTOP-LF-001")
                        .dueno("Luis Fernández").licenciaOffice("Office 365")
                        .windows("Windows 11 Pro").licenciaWindows("OEM")
                        .fechaCompra(LocalDate.of(2024, 5, 1)).valor(2800000.00)
                        .usuarioWindows("luis.f").novedades("Requiere reemplazo de batería").build());
                }

                System.out.println("=== Datos de prueba cargados exitosamente ===");
            } else {
                System.out.println("=== La base de datos ya tiene datos ===");
            }
        };
    }
}
