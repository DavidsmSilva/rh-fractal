package com.fractal.rh.controller;

import com.fractal.rh.entity.Empleado;
import com.fractal.rh.entity.Nomina;
import com.fractal.rh.entity.InventarioEquipo;
import com.fractal.rh.entity.Departamento;
import com.fractal.rh.repository.EmpleadoRepository;
import com.fractal.rh.repository.NominaRepository;
import com.fractal.rh.repository.InventarioEquipoRepository;
import com.fractal.rh.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private NominaRepository nominaRepository;

    @Autowired
    private InventarioEquipoRepository inventarioEquipoRepository;

    @Autowired
    private DepartamentoRepository departamentoRepository;

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
        String numeroEmpleado = generarCodigoEmpleado();
        empleado.setNumeroEmpleado(numeroEmpleado);
        
        if (empleado.getRol() == null || empleado.getRol().isEmpty()) {
            empleado.setRol("Empleado");
        }
        
        Empleado empleadoGuardado = empleadoRepository.save(empleado);
        
        crearNomina(empleadoGuardado);
        
        asignarLaptop(empleadoGuardado);
        
        actualizarDepartamento(empleadoGuardado);
        
        return empleadoGuardado;
    }

    private String generarCodigoEmpleado() {
        List<Empleado> todosEmpleados = empleadoRepository.findAll();
        int maxNumero = 0;
        for (Empleado emp : todosEmpleados) {
            if (emp.getNumeroEmpleado() != null && emp.getNumeroEmpleado().startsWith("EMP-")) {
                try {
                    int num = Integer.parseInt(emp.getNumeroEmpleado().replace("EMP-", ""));
                    if (num > maxNumero) {
                        maxNumero = num;
                    }
                } catch (NumberFormatException e) {
                    // ignore
                }
            }
        }
        return String.format("EMP-%04d", maxNumero + 1);
    }

    private void crearNomina(Empleado empleado) {
        double devengado = empleado.getSalario() != null ? empleado.getSalario() : 0.0;
        double deducciones = devengado * 0.10;
        double neto = devengado - deducciones;
        
        String periodoActual = LocalDate.now().getYear() + "-" + String.format("%02d", LocalDate.now().getMonthValue());
        
        Nomina nomina = Nomina.builder()
                .empleadoId(empleado.getId())
                .nombreEmpleado(empleado.getNombre() + " " + empleado.getApellido())
                .periodo(periodoActual)
                .periodoNomina(periodoActual)
                .fechaPago(LocalDate.now().plusDays(30))
                .totalDevengado(devengado)
                .totalDeducciones(deducciones)
                .totalNeto(neto)
                .estado("PENDIENTE")
                .build();
        
        nominaRepository.save(nomina);
    }

    private void asignarLaptop(Empleado empleado) {
        List<InventarioEquipo> equiposDisponibles = inventarioEquipoRepository.findAll();
        
        Optional<InventarioEquipo> laptopDisponible = equiposDisponibles.stream()
                .filter(eq -> eq.getDueno() == null || eq.getDueno().isEmpty() || eq.getDueno().equals("Varios"))
                .findFirst();
        
        if (laptopDisponible.isPresent()) {
            InventarioEquipo equipo = laptopDisponible.get();
            equipo.setDueno(empleado.getNombre() + " " + empleado.getApellido());
            equipo.setUsuario(empleado.getEmail());
            equipo.setCargo(empleado.getCargo());
            equipo.setCuentaCorreo(empleado.getEmail());
            inventarioEquipoRepository.save(equipo);
        } else {
            String[] marcas = {"Dell", "HP", "Lenovo", "Apple"};
            String[] modelos = {"Latitude 5400", "ProBook 450", "ThinkPad T14", "MacBook Air"};
            Random random = new Random();
            int idx = random.nextInt(marcas.length);
            
            InventarioEquipo nuevoEquipo = InventarioEquipo.builder()
                    .nombreEquipo("LAPTOP-" + empleado.getNumeroEmpleado())
                    .dueno(empleado.getNombre() + " " + empleado.getApellido())
                    .usuario(empleado.getEmail())
                    .cargo(empleado.getCargo())
                    .marca(marcas[idx])
                    .modelo(modelos[idx])
                    .procesador("Intel Core i5")
                    .serialEquipo("GEN-" + System.currentTimeMillis())
                    .ubicacion("Oficina Principal")
                    .cuentaCorreo(empleado.getEmail())
                    .licenciaOffice("Microsoft 365")
                    .windows("Windows 11 Pro")
                    .usuarioWindows(empleado.getNombre().charAt(0) + "." + empleado.getApellido())
                    .pinWindows(String.format("%04d", random.nextInt(10000)))
                    .fechaCompra(LocalDate.now())
                    .valor(1000.0)
                    .novedades("Equipo asignado automáticamente al nuevo empleado")
                    .build();
            
            inventarioEquipoRepository.save(nuevoEquipo);
        }
    }

    private void actualizarDepartamento(Empleado empleado) {
        if (empleado.getDepartamento() != null && !empleado.getDepartamento().isEmpty()) {
            List<Departamento> departamentos = departamentoRepository.findAll();
            Optional<Departamento> dept = departamentos.stream()
                    .filter(d -> d.getNombre().equals(empleado.getDepartamento()))
                    .findFirst();
            
            if (dept.isPresent()) {
                Departamento departamento = dept.get();
                String nombreCompleto = empleado.getNombre() + " " + empleado.getApellido();
                
                String listaActual = departamento.getListaEmpleados();
                if (listaActual == null || listaActual.isEmpty()) {
                    listaActual = nombreCompleto;
                } else {
                    listaActual = listaActual + ", " + nombreCompleto;
                }
                departamento.setListaEmpleados(listaActual);
                
                Integer numActual = departamento.getNumeroEmpleados();
                departamento.setNumeroEmpleados((numActual != null ? numActual : 0) + 1);
                
                departamentoRepository.save(departamento);
            }
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
