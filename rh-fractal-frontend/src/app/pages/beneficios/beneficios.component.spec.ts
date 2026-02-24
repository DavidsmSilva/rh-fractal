import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BeneficiosComponent } from './beneficios.component';

describe('BeneficiosComponent', () => {
  let component: BeneficiosComponent;
  let fixture: ComponentFixture<BeneficiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientModule, BeneficiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load beneficios on init', () => {
    component.ngOnInit();
    expect(component.beneficios).toBeDefined();
  });

  it('should filter beneficios by search', () => {
    component.beneficios = [
      { id: 1, nombre: 'Salud', descripcion: 'Plan médico', tipo: 'Salud', cobertura: 'Todos', valorMensual: 100, estado: 'ACTIVO' }
    ];
    component.busqueda = 'Salud';
    component.filtrarBeneficios();
    expect(component.beneficiosFiltrados.length).toBe(1);
  });

  it('should get active beneficios count', () => {
    component.beneficios = [
      { id: 1, nombre: 'Salud', descripcion: 'Plan médico', tipo: 'Salud', cobertura: 'Todos', valorMensual: 100, estado: 'ACTIVO' },
      { id: 2, nombre: 'Transporte', descripcion: 'Bono', tipo: 'Transporte', cobertura: 'Todos', valorMensual: 50, estado: 'INACTIVO' }
    ];
    expect(component.getBeneficiosActivos()).toBe(1);
  });

  it('should get total inversion', () => {
    component.beneficios = [
      { id: 1, nombre: 'Salud', descripcion: 'Plan médico', tipo: 'Salud', cobertura: 'Todos', valorMensual: 100, estado: 'ACTIVO' }
    ];
    expect(component.getInversionTotal()).toBe(1200);
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
