package com.fractal.rh.controller;

import com.fractal.rh.entity.Empleado;
import com.fractal.rh.entity.Nomina;
import com.fractal.rh.entity.Vacacion;
import com.fractal.rh.entity.Departamento;
import com.fractal.rh.entity.InventarioEquipo;
import com.fractal.rh.repository.EmpleadoRepository;
import com.fractal.rh.repository.NominaRepository;
import com.fractal.rh.repository.VacacionRepository;
import com.fractal.rh.repository.DepartamentoRepository;
import com.fractal.rh.repository.InventarioEquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private NominaRepository nominaRepository;

    @Autowired
    private VacacionRepository vacacionRepository;

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Autowired
    private InventarioEquipoRepository inventarioEquipoRepository;

    @GetMapping
    public List<Empleado> getAllEmpleados() {
        return empleadoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empleado> getEmpleadoById(@PathVariable Long id) {
        Optional<Empleado> empleado = empleadoRepository.findById(id);
        return empleado.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Empleado createEmpleado(@RequestBody Empleado empleado) {
        // 1. Generar código de empleado automático
        String codigoEmpleado = generarCodigoEmpleado();
        empleado.setNumeroEmpleado(codigoEmpleado);
        
        // 2. Si no tiene rol, asignar por defecto
        if (empleado.getRol() == null || empleado.getRol().isEmpty()) {
            empleado.setRol("Empleado");
        }
        
        // 3. Guardar empleado
        Empleado empleadoGuardado = empleadoRepository.save(empleado);
        
        // 4. Crear nómina automática
        crearNomina(empleadoGuardado);
        
        // 5. Asignar laptop
        asignarLaptop(empleadoGuardado);
        
        // 6. Crear vacaciones
        crearVacaciones(empleadoGuardado);
        
        // 7. Actualizar departamento
        actualizarDepartamento(empleado.getDepartamento(), empleado.getNombre() + " " + empleado.getApellido());
        
        return empleadoGuardado;
    }

    private String generarCodigoEmpleado() {
        List<Empleado> empleados = empleadoRepository.findAll();
        int maxNumero = 0;
        for (Empleado emp : empleados) {
            if (emp.getNumeroEmpleado() != null && emp.getNumeroEmpleado().startsWith("EMP-")) {
                try {
                    int numero = Integer.parseInt(emp.getNumeroEmpleado().replace("EMP-", ""));
                    if (numero > maxNumero) {
                        maxNumero = numero;
                    }
                } catch (NumberFormatException e) {
                    // Ignorar
                }
            }
        }
        return String.format("EMP-%04d", maxNumero + 1);
    }

    private void crearNomina(Empleado empleado) {
        String periodoActual = YearMonth.now().toString(); // 2026-02
        double devengado = empleado.getSalario();
        double deducciones = devengado * 0.10;
        double neto = devengado - deducciones;
        
        Nomina nomina = Nomina.builder()
                .empleadoId(empleado.getId())
                .nombreEmpleado(empleado.getNombre() + " " + empleado.getApellido())
                .periodo(periodoActual)
                .periodoNomina(periodoActual)
                .fechaPago(LocalDate.now())
                .totalDevengado(devengado)
                .totalDeducciones(deducciones)
                .totalNeto(neto)
                .estado("PENDIENTE")
                .build();
        
        nominaRepository.save(nomina);
    }

    private void asignarLaptop(Empleado empleado) {
        // Buscar laptop disponible (sin dueno)
        Optional<InventarioEquipo> laptopDisponible = inventarioEquipoRepository.findAll().stream()
                .filter(eq -> eq.getDueno() == null || eq.getDueno().isEmpty() || eq.getDueno().equals("Varios"))
                .findFirst();
        
        InventarioEquipo laptop;
        if (laptopDisponible.isPresent()) {
            // Asignar laptop existente
            laptop = laptopDisponible.get();
        } else {
            // Crear laptop nueva
            laptop = InventarioEquipo.builder()
                    .nombreEquipo("LAPTOP-" + empleado.getNumeroEmpleado())
                    .marca("Dell")
                    .modelo("Latitude 5400")
                    .procesador("Intel Core i5")
                    .serialEquipo("GEN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                    .ubicacion("Oficina Principal")
                    .licenciaOffice("Microsoft 365")
                    .windows("Windows 11 Pro")
                    .fechaCompra(LocalDate.now())
                    .valor(1100.0)
                    .build();
        }
        
        // Asignar al empleado
        laptop.setDueno(empleado.getNombre() + " " + empleado.getApellido());
        laptop.setUsuario(empleado.getEmail());
        laptop.setCargo(empleado.getCargo());
        laptop.setUsuarioWindows(empleado.getEmail().split("@")[0]);
        laptop.setPinWindows("0000");
        
        inventarioEquipoRepository.save(laptop);
    }

    private void crearVacaciones(Empleado empleado) {
        Vacacion vacacion = Vacacion.builder()
                .empleadoId(empleado.getId())
                .nombreEmpleado(empleado.getNombre() + " " + empleado.getApellido())
                .periodoVacacional(String.valueOf(LocalDate.now().getYear()))
                .dias(0)
                .diasTotales(25)
                .estado("ACTIVO")
                .fechaSolicitud(LocalDate.now())
                .build();
        
        vacacionRepository.save(vacacion);
    }

    private void actualizarDepartamento(String nombreDepartamento, String nombreEmpleado) {
        Optional<Departamento> depto = departamentoRepository.findAll().stream()
                .filter(d -> d.getNombre().equals(nombreDepartamento))
                .findFirst();
        
        if (depto.isPresent()) {
            Departamento d = depto.get();
            String listaActual = d.getListaEmpleados();
            if (listaActual == null || listaActual.isEmpty()) {
                d.setListaEmpleados(nombreEmpleado);
            } else {
                d.setListaEmpleados(listaActual + ", " + nombreEmpleado);
            }
            d.setNumeroEmpleados((d.getNumeroEmpleados() != null ? d.getNumeroEmpleados() : 0) + 1);
            departamentoRepository.save(d);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empleado> updateEmpleado(@PathVariable Long id, @RequestBody Empleado empleadoDetails) {
        Optional<Empleado> empleadoData = empleadoRepository.findById(id);
        
        if (empleadoData.isPresent()) {
            Empleado _empleado = empleadoData.get();
            _empleado.setNombre(empleadoDetails.getNombre());
            _empleado.setApellido(empleadoDetails.getApellido());
            _empleado.setEmail(empleadoDetails.getEmail());
            _empleado.setFechaNacimiento(empleadoDetails.getFechaNacimiento());
            _empleado.setFechaContratacion(empleadoDetails.getFechaContratacion());
            _empleado.setCargo(empleadoDetails.getCargo());
            _empleado.setSalario(empleadoDetails.getSalario());
            _empleado.setNumeroEmpleado(empleadoDetails.getNumeroEmpleado());
            _empleado.setDepartamento(empleadoDetails.getDepartamento());
            _empleado.setEstado(empleadoDetails.getEstado());
            _empleado.setTelefonoContacto(empleadoDetails.getTelefonoContacto());
            _empleado.setDireccionResidencia(empleadoDetails.getDireccionResidencia());
            _empleado.setCiudadResidencia(empleadoDetails.getCiudadResidencia());
            _empleado.setPaisResidencia(empleadoDetails.getPaisResidencia());
            _empleado.setTipoContrato(empleadoDetails.getTipoContrato());
            _empleado.setHorasSemanales(empleadoDetails.getHorasSemanales());
            _empleado.setFechaFinalizacion(empleadoDetails.getFechaFinalizacion());
            _empleado.setMotivoFinalizacion(empleadoDetails.getMotivoFinalizacion());
            _empleado.setBeneficios(empleadoDetails.getBeneficios());
            _empleado.setObservaciones(empleadoDetails.getObservaciones());
            _empleado.setRol(empleadoDetails.getRol());
            
            return ResponseEntity.ok(empleadoRepository.save(_empleado));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmpleado(@PathVariable Long id) {
        Optional<Empleado> empleado = empleadoRepository.findById(id);
        
        if (empleado.isPresent()) {
            empleadoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/departamento/{departamento}")
    public List<Empleado> getEmpleadosByDepartamento(@PathVariable String departamento) {
        return empleadoRepository.findByDepartamento(departamento);
    }

    @GetMapping("/estado/{estado}")
    public List<Empleado> getEmpleadosByEstado(@PathVariable String estado) {
        return empleadoRepository.findByEstado(estado);
    }

    @GetMapping("/cargo/{cargo}")
    public List<Empleado> getEmpleadosByCargo(@PathVariable String cargo) {
        return empleadoRepository.findByCargo(cargo);
    }

    @GetMapping("/numero/{numero}")
    public ResponseEntity<Empleado> getEmpleadoByNumero(@PathVariable String numero) {
        Optional<Empleado> empleado = empleadoRepository.findByNumeroEmpleado(numero);
        return empleado.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Empleado> getEmpleadoByEmail(@PathVariable String email) {
        Optional<Empleado> empleado = empleadoRepository.findByEmail(email);
        return empleado.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/contratacion/entre/{startDate}/{endDate}")
    public List<Empleado> getEmpleadosByFechaContratacion(
            @PathVariable String startDate, @PathVariable String endDate) {
        return empleadoRepository.findByFechaContratacionBetween(
                java.time.LocalDate.parse(startDate),
                java.time.LocalDate.parse(endDate)
        );
    }
}