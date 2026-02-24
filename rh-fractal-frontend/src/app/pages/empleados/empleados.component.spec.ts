import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadosComponent } from './empleados.component';

describe('EmpleadosComponent', () => {
  let component: EmpleadosComponent;
  let fixture: ComponentFixture<EmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientModule, EmpleadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load empleados on init', () => {
    component.ngOnInit();
    expect(component.empleados).toBeDefined();
  });

  it('should filter empleados by search', () => {
    component.empleados = [
      { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan@test.com', numeroEmpleado: '001', cargo: 'Dev', departamento: 'IT', salario: 1000, estado: 'ACTIVO' }
    ];
    component.busqueda = 'Juan';
    component.filtrarEmpleados();
    expect(component.empleadosFiltrados.length).toBe(1);
  });

  it('should get active empleados count', () => {
    component.empleados = [
      { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan@test.com', numeroEmpleado: '001', cargo: 'Dev', departamento: 'IT', salario: 1000, estado: 'ACTIVO' },
      { id: 2, nombre: 'Maria', apellido: 'Garcia', email: 'maria@test.com', numeroEmpleado: '002', cargo: 'Designer', departamento: 'IT', salario: 1000, estado: 'INACTIVO' }
    ];
    expect(component.getEmpleadosActivos()).toBe(1);
  });

  it('should get inactive empleados count', () => {
    component.empleados = [
      { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan@test.com', numeroEmpleado: '001', cargo: 'Dev', departamento: 'IT', salario: 1000, estado: 'ACTIVO' },
      { id: 2, nombre: 'Maria', apellido: 'Garcia', email: 'maria@test.com', numeroEmpleado: '002', cargo: 'Designer', departamento: 'IT', salario: 1000, estado: 'INACTIVO' }
    ];
    expect(component.getEmpleadosInactivos()).toBe(1);
  });

  it('should get departamentos count', () => {
    component.empleados = [
      { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan@test.com', numeroEmpleado: '001', cargo: 'Dev', departamento: 'IT', salario: 1000, estado: 'ACTIVO' },
      { id: 2, nombre: 'Maria', apellido: 'Garcia', email: 'maria@test.com', numeroEmpleado: '002', cargo: 'Designer', departamento: 'Marketing', salario: 1000, estado: 'ACTIVO' }
    ];
    expect(component.getDepartamentos()).toBe(2);
  });

  it('should open modal', () => {
    component.abrirModal();
    expect(component.mostrarModal).toBe(true);
  });

  it('should close modal', () => {
    component.mostrarModal = true;
    component.cerrarModal();
    expect(component.mostrarModal).toBe(false);
  });

  it('should render page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-title')).toBeTruthy();
  });

  it('should render search input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[type="text"]')).toBeTruthy();
  });
});
