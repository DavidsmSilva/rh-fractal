import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DepartamentosComponent } from './departamentos.component';

describe('DepartamentosComponent', () => {
  let component: DepartamentosComponent;
  let fixture: ComponentFixture<DepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientModule, DepartamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load departamentos on init', () => {
    component.ngOnInit();
    expect(component.departamentos).toBeDefined();
  });

  it('should filter departamentos by search', () => {
    component.departamentos = [
      { id: 1, nombre: 'Tecnología', descripcion: 'IT', codigo: 'IT', presupuesto: 1000, jefe: 'Juan', numeroEmpleados: 10, estado: 'ACTIVO' }
    ];
    component.busqueda = 'Tecnología';
    component.filtrarDepartamentos();
    expect(component.departamentosFiltrados.length).toBe(1);
  });

  it('should get total empleados', () => {
    component.departamentos = [
      { id: 1, nombre: 'Tecnología', descripcion: 'IT', codigo: 'IT', presupuesto: 1000, jefe: 'Juan', numeroEmpleados: 10, estado: 'ACTIVO' }
    ];
    expect(component.getTotalEmpleados()).toBe(10);
  });

  it('should get presupuesto total', () => {
    component.departamentos = [
      { id: 1, nombre: 'Tecnología', descripcion: 'IT', codigo: 'IT', presupuesto: 1000, jefe: 'Juan', numeroEmpleados: 10, estado: 'ACTIVO' }
    ];
    expect(component.getPresupuestoTotal()).toBe(1000);
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
});
