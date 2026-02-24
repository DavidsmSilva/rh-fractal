import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VacacionesComponent } from './vacaciones.component';

describe('VacacionesComponent', () => {
  let component: VacacionesComponent;
  let fixture: ComponentFixture<VacacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientModule, VacacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vacaciones on init', () => {
    component.ngOnInit();
    expect(component.vacaciones).toBeDefined();
  });

  it('should filter vacaciones by search', () => {
    component.vacaciones = [
      { id: 1, empleadoId: 1, nombreEmpleado: 'Juan Perez', fechaInicio: '2024-01-01', fechaFin: '2024-01-15', dias: 15, estado: 'APROBADA', fechaSolicitud: '2023-12-01' }
    ];
    component.busqueda = 'Juan';
    component.filtrarVacaciones();
    expect(component.vacacionesFiltradas.length).toBe(1);
  });

  it('should get approved vacaciones count', () => {
    component.vacaciones = [
      { id: 1, empleadoId: 1, nombreEmpleado: 'Juan', fechaInicio: '2024-01-01', fechaFin: '2024-01-15', dias: 15, estado: 'APROBADA', fechaSolicitud: '2023-12-01' }
    ];
    expect(component.getAprobadas()).toBe(1);
  });

  it('should get pending vacaciones count', () => {
    component.vacaciones = [
      { id: 1, empleadoId: 1, nombreEmpleado: 'Juan', fechaInicio: '2024-01-01', fechaFin: '2024-01-15', dias: 15, estado: 'PENDIENTE', fechaSolicitud: '2023-12-01' }
    ];
    expect(component.getPendientes()).toBe(1);
  });

  it('should get total dias', () => {
    component.vacaciones = [
      { id: 1, empleadoId: 1, nombreEmpleado: 'Juan', fechaInicio: '2024-01-01', fechaFin: '2024-01-15', dias: 15, estado: 'APROBADA', fechaSolicitud: '2023-12-01' }
    ];
    expect(component.getDiasTotales()).toBe(15);
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
