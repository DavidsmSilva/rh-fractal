import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Contrato {
  id?: number;
  empleadoId: number;
  nombreEmpleado: string;
  tipoContrato: string;
  fechaInicio: string;
  fechaFin?: string;
  salario: number;
  estado: string;
  observaciones?: string;
}

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="contratos-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="page-title-icon">📄</span>
            Contratos
          </h1>
          <p class="page-subtitle">Gestión de contratos laborales</p>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon stat-icon-green">📋</div>
          <div class="stat-content">
            <h4>Total Contratos</h4>
            <span class="stat-value">{{ contratos.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-blue">✅</div>
          <div class="stat-content">
            <h4>Activos</h4>
            <span class="stat-value">{{ getActivos() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-orange">⏳</div>
          <div class="stat-content">
            <h4>Vencidos</h4>
            <span class="stat-value">{{ getVencidos() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-purple">💰</div>
          <div class="stat-content">
            <h4>Total Nómina</h4>
            <span class="stat-value">{{ getTotalSalarios() | currency:'USD':'symbol':'1.0-0' }}</span>
          </div>
        </div>
      </div>
      
      <div class="search-bar">
        <div class="search-input-wrapper">
          <input type="text" [(ngModel)]="busqueda" (input)="filtrarContratos()" placeholder="Buscar empleado o tipo de contrato..." />
        </div>
        <button (click)="abrirModal()">+ Nuevo Contrato</button>
      </div>
      
      <div class="contratos-grid">
        <div class="contrato-card" *ngFor="let con of contratosFiltrados">
          <div class="card-header">
            <h3>{{ con.nombreEmpleado }}</h3>
            <span class="status-badge" [class.status-active]="con.estado === 'ACTIVO'" [class.status-pending]="con.estado !== 'ACTIVO'">{{ con.estado }}</span>
          </div>
          <div class="card-body">
            <p>
              <span class="card-icon">📝</span>
              <span class="card-label">Tipo:</span>
              <span class="card-value">{{ con.tipoContrato }}</span>
            </p>
            <p>
              <span class="card-icon">💵</span>
              <span class="card-label">Salario:</span>
              <span class="card-value">{{ con.salario | currency:'USD':'symbol':'1.0-0' }}</span>
            </p>
            <p>
              <span class="card-icon">📅</span>
              <span class="card-label">Inicio:</span>
              <span class="card-value">{{ con.fechaInicio | date:'dd/MM/yyyy' }}</span>
            </p>
            <p *ngIf="con.fechaFin">
              <span class="card-icon">🏁</span>
              <span class="card-label">Fin:</span>
              <span class="card-value">{{ con.fechaFin | date:'dd/MM/yyyy' }}</span>
            </p>
          </div>
          <div class="card-footer">
            <button class="card-action card-action-secondary" (click)="eliminarContrato(con.id!)">Eliminar</button>
            <button class="card-action card-action-primary">Ver Detalles</button>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="mostrarModal" (click)="cerrarModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Nuevo Contrato</h2>
            <button class="close-btn" (click)="cerrarModal()">×</button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="guardarContrato()">
              <div class="form-row">
                <div class="form-group">
                  <label>Empleado *</label>
                  <select [(ngModel)]="nuevoContrato.empleadoId" name="empleadoId" required>
                    <option value="">Seleccionar...</option>
                    <option *ngFor="let emp of empleados" [value]="emp.id">{{ emp.nombre }} {{ emp.apellido }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Tipo de Contrato *</label>
                  <select [(ngModel)]="nuevoContrato.tipoContrato" name="tipoContrato" required>
                    <option value="INDEFINIDO">Indefinido</option>
                    <option value="FIJO">Fijo</option>
                    <option value="PRESTACION_SERVICIOS">Prestación de Servicios</option>
                    <option value="APRENDIZAJE">Aprendizaje</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Fecha Inicio *</label>
                  <input type="date" [(ngModel)]="nuevoContrato.fechaInicio" name="fechaInicio" required>
                </div>
                <div class="form-group">
                  <label>Fecha Fin</label>
                  <input type="date" [(ngModel)]="nuevoContrato.fechaFin" name="fechaFin">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Salario *</label>
                  <input type="number" [(ngModel)]="nuevoContrato.salario" name="salario" required>
                </div>
                <div class="form-group">
                  <label>Estado</label>
                  <select [(ngModel)]="nuevoContrato.estado" name="estado">
                    <option value="ACTIVO">Activo</option>
                    <option value="VENCIDO">Vencido</option>
                    <option value="RENOVADO">Renovado</option>
                  </select>
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-cancelar" (click)="cerrarModal()">Cancelar</button>
                <button type="submit" class="btn-guardar">Guardar Contrato</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contratos-container { padding: 20px; }
    .page-header { margin-bottom: 20px; }
    .page-title { font-size: 1.8em; color: #1B4332; display: flex; align-items: center; gap: 10px; }
    .page-title-icon { font-size: 1.2em; }
    .page-subtitle { color: #666; margin-top: 5px; }
    .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px; }
    .stat-card { background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 15px; }
    .stat-icon { font-size: 2em; }
    .stat-icon-green { color: #28a745; }
    .stat-icon-blue { color: #007bff; }
    .stat-icon-orange { color: #fd7e14; }
    .stat-icon-purple { color: #6f42c1; }
    .stat-content h4 { margin: 0; font-size: 0.85em; color: #666; }
    .stat-value { font-size: 1.5em; font-weight: bold; color: #1B4332; }
    .search-bar { display: flex; gap: 10px; margin-bottom: 20px; }
    .search-input-wrapper { flex: 1; }
    .search-input-wrapper input { width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1em; }
    .search-bar button { padding: 12px 24px; background: linear-gradient(135deg, #2E7D32, #1B5E20); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .contratos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .contrato-card { background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; }
    .card-header { background: linear-gradient(135deg, #1B4332, #2E7D32); color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center; }
    .card-header h3 { margin: 0; font-size: 1.1em; }
    .card-body { padding: 15px; }
    .card-body p { margin: 8px 0; display: flex; align-items: center; gap: 8px; }
    .card-icon { font-size: 1.2em; }
    .card-label { color: #666; flex: 1; }
    .card-value { font-weight: 600; color: #1B4332; }
    .card-footer { padding: 15px; border-top: 1px solid #e0e0e0; display: flex; gap: 10px; }
    .card-action { flex: 1; padding: 8px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .card-action-primary { background: #2E7D32; color: white; }
    .card-action-secondary { background: #f5f5f5; color: #666; }
    .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 0.8em; font-weight: bold; }
    .status-active { background: #28a745; color: white; }
    .status-pending { background: #ffc107; color: #333; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: white; border-radius: 16px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    .modal-header { padding: 1.5rem; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; }
    .modal-header h2 { margin: 0; color: #1B4332; }
    .close-btn { background: none; border: none; font-size: 2rem; cursor: pointer; color: #666; }
    .modal-body { padding: 1.5rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .form-group { display: flex; flex-direction: column; }
    .form-group label { font-size: 0.85rem; color: #1B4332; margin-bottom: 0.25rem; font-weight: 500; }
    .form-group input, .form-group select { padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 0.95rem; }
    .form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .btn-cancelar, .btn-guardar { flex: 1; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; }
    .btn-cancelar { background: #f5f5f5; border: 2px solid #ddd; color: #666; }
    .btn-guardar { background: linear-gradient(135deg, #2E7D32, #1B5E20); border: none; color: white; }
  `]
})
export class ContratosComponent implements OnInit {
  contratos: Contrato[] = [];
  contratosFiltrados: Contrato[] = [];
  empleados: any[] = [];
  busqueda: string = '';
  mostrarModal: boolean = false;
  
  nuevoContrato: Contrato = {
    empleadoId: 0,
    nombreEmpleado: '',
    tipoContrato: 'INDEFINIDO',
    fechaInicio: new Date().toISOString().split('T')[0],
    salario: 0,
    estado: 'ACTIVO'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarContratos();
    this.cargarEmpleados();
  }

  cargarContratos() {
    this.http.get<Contrato[]>('/api/contratos').subscribe({
      next: (data) => {
        this.contratos = data;
        this.contratosFiltrados = data;
      },
      error: (err) => console.error('Error cargando contratos:', err)
    });
  }

  cargarEmpleados() {
    this.http.get<any[]>('/api/empleados').subscribe({
      next: (data) => this.empleados = data,
      error: (err) => console.error('Error cargando empleados:', err)
    });
  }

  filtrarContratos() {
    const b = this.busqueda.toLowerCase();
    this.contratosFiltrados = this.contratos.filter(c =>
      c.nombreEmpleado?.toLowerCase().includes(b) ||
      c.tipoContrato?.toLowerCase().includes(b)
    );
  }

  getActivos(): number {
    return this.contratos.filter(c => c.estado === 'ACTIVO').length;
  }

  getVencidos(): number {
    return this.contratos.filter(c => c.estado === 'VENCIDO').length;
  }

  getTotalSalarios(): number {
    return this.contratos.reduce((sum, c) => sum + (c.salario || 0), 0);
  }

  abrirModal() {
    this.nuevoContrato = {
      empleadoId: 0,
      nombreEmpleado: '',
      tipoContrato: 'INDEFINIDO',
      fechaInicio: new Date().toISOString().split('T')[0],
      salario: 0,
      estado: 'ACTIVO'
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarContrato() {
    const emp = this.empleados.find(e => e.id === this.nuevoContrato.empleadoId);
    if (emp) {
      this.nuevoContrato.nombreEmpleado = emp.nombre + ' ' + emp.apellido;
    }
    this.http.post<Contrato>('/api/contratos', this.nuevoContrato).subscribe({
      next: (guardado) => {
        this.contratos.push(guardado);
        this.filtrarContratos();
        this.cerrarModal();
        alert('Contrato guardado exitosamente!');
      },
      error: (err) => {
        console.error('Error guardando contrato:', err);
        alert('Error al guardar contrato');
      }
    });
  }

  eliminarContrato(id: number) {
    if (confirm('¿Eliminar este contrato?')) {
      this.http.delete(`/api/contratos/${id}`).subscribe({
        next: () => {
          this.contratos = this.contratos.filter(c => c.id !== id);
          this.filtrarContratos();
        },
        error: (err) => console.error('Error eliminando:', err)
      });
    }
  }
}
