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
                }

                empleadoRepository.save(Empleado.builder()
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

                empleadoRepository.save(Empleado.builder()
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

                empleadoRepository.save(Empleado.builder()
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

                empleadoRepository.save(Empleado.builder()
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

                empleadoRepository.save(Empleado.builder()
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
                }

                System.out.println("=== Datos de prueba cargados exitosamente ===");
            } else {
                System.out.println("=== La base de datos ya tiene datos ===");
            }
        };
    }
}
