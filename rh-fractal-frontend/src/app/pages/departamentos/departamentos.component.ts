import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Empleado {
  id?: number;
  nombre: string;
  apellido: string;
  departamento: string;
  estado: string;
}

interface Departamento {
  id?: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  presupuesto: number;
  jefe: string;
  numeroEmpleados: number;
  estado: string;
}

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="departamentos-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="page-title-icon">🏢</span>
            Departamentos
          </h1>
          <p class="page-subtitle">Estructura organizacional y gestión de áreas</p>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon stat-icon-green">🏢</div>
          <div class="stat-content">
            <h4>Total Departamentos</h4>
            <span class="stat-value">{{ departamentos.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-blue">👥</div>
          <div class="stat-content">
            <h4>Total Empleados</h4>
            <span class="stat-value">{{ getTotalEmpleados() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-purple">💰</div>
          <div class="stat-content">
            <h4>Presupuesto Total</h4>
            <span class="stat-value">{{ getPresupuestoTotal() | currency:'USD':'symbol':'1.0-0' }}</span>
          </div>
        </div>
      </div>
      
      <div class="search-bar">
        <div class="search-input-wrapper">
          <input type="text" [(ngModel)]="busqueda" (input)="filtrarDepartamentos()" placeholder="Buscar departamento..." />
        </div>
        <button (click)="abrirModal()">+ Nuevo Departamento</button>
      </div>
      
      <div class="departamentos-grid">
        <div class="departamento-card" *ngFor="let dept of departamentosFiltrados">
          <div class="card-header">
            <h3>{{ dept.nombre }}</h3>
          </div>
          <div class="card-body">
            <p>
              <span class="card-icon">🏷️</span>
              <span class="card-label">Código:</span>
              <span class="card-value">{{ dept.codigo }}</span>
            </p>
            <p>
              <span class="card-icon">📝</span>
              <span class="card-label">Descripción:</span>
              <span class="card-value">{{ dept.descripcion }}</span>
            </p>
            <p>
              <span class="card-icon">💵</span>
              <span class="card-label">Presupuesto:</span>
              <span class="card-value">{{ dept.presupuesto | currency:'USD':'symbol':'1.0-0' }}</span>
            </p>
            <p>
              <span class="card-icon">👤</span>
              <span class="card-label">Jefe:</span>
              <span class="card-value">{{ dept.jefe }}</span>
            </p>
            <p>
              <span class="card-icon">👥</span>
              <span class="card-label">Empleados:</span>
              <span class="card-value">{{ getEmpleadosPorDepartamento(dept.nombre) }}</span>
            </p>
          </div>
          <div class="card-footer">
            <button class="card-action card-action-secondary">Editar</button>
            <button class="card-action card-action-primary">Ver Detalles</button>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="mostrarModal" (click)="cerrarModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Nuevo Departamento</h2>
            <button class="close-btn" (click)="cerrarModal()">×</button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="guardarDepartamento()">
              <div class="form-row">
                <div class="form-group">
                  <label>Nombre *</label>
                  <input type="text" [(ngModel)]="nuevoDepartamento.nombre" name="nombre" required>
                </div>
                <div class="form-group">
                  <label>Código *</label>
                  <input type="text" [(ngModel)]="nuevoDepartamento.codigo" name="codigo" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Descripción *</label>
                  <input type="text" [(ngModel)]="nuevoDepartamento.descripcion" name="descripcion" required>
                </div>
                <div class="form-group">
                  <label>Jefe *</label>
                  <input type="text" [(ngModel)]="nuevoDepartamento.jefe" name="jefe" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Presupuesto *</label>
                  <input type="number" [(ngModel)]="nuevoDepartamento.presupuesto" name="presupuesto" required>
                </div>
                <div class="form-group">
                  <label>Número de Empleados</label>
                  <input type="number" [(ngModel)]="nuevoDepartamento.numeroEmpleados" name="numeroEmpleados">
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-cancelar" (click)="cerrarModal()">Cancelar</button>
                <button type="submit" class="btn-guardar">Guardar Departamento</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: white; border-radius: 16px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    .modal-header { padding: 1.5rem; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; }
    .modal-header h2 { margin: 0; color: #1B4332; font-size: 1.5rem; }
    .close-btn { background: none; border: none; font-size: 2rem; cursor: pointer; color: #666; line-height: 1; }
    .close-btn:hover { color: #1B4332; }
    .modal-body { padding: 1.5rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .form-group { display: flex; flex-direction: column; }
    .form-group label { font-size: 0.85rem; color: #1B4332; margin-bottom: 0.25rem; font-weight: 500; }
    .form-group input { padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 0.95rem; transition: border-color 0.3s; }
    .form-group input:focus { outline: none; border-color: #2E7D32; }
    .form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .btn-cancelar, .btn-guardar { flex: 1; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; }
    .btn-cancelar { background: #f5f5f5; border: 2px solid #ddd; color: #666; }
    .btn-cancelar:hover { background: #e0e0e0; }
    .btn-guardar { background: linear-gradient(135deg, #2E7D32, #1B5E20); border: none; color: white; }
    .btn-guardar:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(46,125,50,0.3); }
  `]
})
export class DepartamentosComponent implements OnInit {
  departamentos: Departamento[] = [];
  departamentosFiltrados: Departamento[] = [];
  empleados: Empleado[] = [];
  busqueda: string = '';
  mostrarModal: boolean = false;
  
  nuevoDepartamento: Departamento = {
    nombre: '',
    descripcion: '',
    codigo: '',
    presupuesto: 0,
    jefe: '',
    numeroEmpleados: 0,
    estado: 'ACTIVO'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarDepartamentos();
    this.cargarEmpleados();
  }

  cargarDepartamentos() {
    this.http.get<Departamento[]>('/api/departamentos').subscribe({
      next: (data) => {
        this.departamentos = data;
        this.departamentosFiltrados = data;
      },
      error: (err) => console.error('Error cargando departamentos:', err)
    });
  }

  cargarEmpleados() {
    this.http.get<Empleado[]>('/api/empleados').subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (err) => console.error('Error cargando empleados:', err)
    });
  }

  filtrarDepartamentos() {
    const busquedaLower = this.busqueda.toLowerCase();
    this.departamentosFiltrados = this.departamentos.filter(dept =>
      dept.nombre.toLowerCase().includes(busquedaLower) ||
      dept.codigo.toLowerCase().includes(busquedaLower) ||
      dept.jefe?.toLowerCase().includes(busquedaLower)
    );
  }

  getEmpleadosPorDepartamento(nombreDepto: string): number {
    return this.empleados.filter(e => 
      e.departamento === nombreDepto && e.estado === 'ACTIVO'
    ).length;
  }

  getTotalEmpleados(): number {
    return this.empleados.filter(e => e.estado === 'ACTIVO').length;
  }

  getPresupuestoTotal(): number {
    return this.departamentos.reduce((sum, dept) => sum + (dept.presupuesto || 0), 0);
  }

  abrirModal() {
    this.nuevoDepartamento = { nombre: '', descripcion: '', codigo: '', presupuesto: 0, jefe: '', numeroEmpleados: 0, estado: 'ACTIVO' };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarDepartamento() {
    this.http.post<Departamento>('/api/departamentos', this.nuevoDepartamento).subscribe({
      next: (departamentoGuardado) => {
        this.departamentos.push(departamentoGuardado);
        this.filtrarDepartamentos();
        this.cerrarModal();
        alert('Departamento guardado exitosamente!');
      },
      error: (err) => {
        console.error('Error guardando departamento:', err);
        alert('Error al guardar departamento');
      }
    });
  }
}
