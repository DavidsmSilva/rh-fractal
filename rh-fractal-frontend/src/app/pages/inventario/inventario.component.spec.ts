import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InventarioComponent } from './inventario.component';

describe('InventarioComponent', () => {
  let component: InventarioComponent;
  let fixture: ComponentFixture<InventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientModule, InventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load equipos on init', () => {
    component.ngOnInit();
    expect(component.equipos).toBeDefined();
  });

  it('should filter equipos by search', () => {
    component.equipos = [
      { id: 1, usuario: 'Juan Perez', contactoTel: '3001234567', cargo: 'Developer', anydesk: '123456', cuentaCorreo: 'juan@empresa.com', ubicacion: 'Oficina 101', serialEquipo: 'SN123', marca: 'Dell', modelo: 'Latitude', procesador: 'Intel i7', nombreEquipo: 'PC-JUAN', dueno: 'Empresa', licenciaOffice: '365', windows: 'Windows 11', licenciaWindows: 'Pro', fechaCompra: '2023-01-01', valor: 1500, usuarioWindows: 'juan', pinWindows: '1234', novedades: '' }
    ];
    component.busqueda = 'Juan';
    component.filtrarEquipos();
    expect(component.equiposFiltrados.length).toBe(1);
  });

  it('should get marcas count', () => {
    component.equipos = [
      { id: 1, usuario: 'Juan', contactoTel: '', cargo: 'Dev', anydesk: '', cuentaCorreo: '', ubicacion: 'Oficina 1', serialEquipo: '', marca: 'Dell', modelo: '', procesador: '', nombreEquipo: '', dueno: '', licenciaOffice: '', windows: '', licenciaWindows: '', fechaCompra: '', valor: 0, usuarioWindows: '', pinWindows: '', novedades: '' }
    ];
    expect(component.getMarcas()).toBe(1);
  });

  it('should get ubicaciones count', () => {
    component.equipos = [
      { id: 1, usuario: 'Juan', contactoTel: '', cargo: 'Dev', anydesk: '', cuentaCorreo: '', ubicacion: 'Oficina 1', serialEquipo: '', marca: 'Dell', modelo: '', procesador: '', nombreEquipo: '', dueno: '', licenciaOffice: '', windows: '', licenciaWindows: '', fechaCompra: '', valor: 0, usuarioWindows: '', pinWindows: '', novedades: '' }
    ];
    expect(component.getUbicaciones()).toBe(1);
  });

  it('should get valor total', () => {
    component.equipos = [
      { id: 1, usuario: 'Juan', contactoTel: '', cargo: 'Dev', anydesk: '', cuentaCorreo: '', ubicacion: 'Oficina 1', serialEquipo: '', marca: 'Dell', modelo: '', procesador: '', nombreEquipo: '', dueno: '', licenciaOffice: '', windows: '', licenciaWindows: '', fechaCompra: '', valor: 1500, usuarioWindows: '', pinWindows: '', novedades: '' }
    ];
    expect(component.getValorTotal()).toBe(1500);
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
