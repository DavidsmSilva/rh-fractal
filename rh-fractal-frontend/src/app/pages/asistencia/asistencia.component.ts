import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Asistencia {
  id?: number;
  empleadoId: number;
  nombreEmpleado: string;
  fecha: string;
  horaEntrada: string;
  horaSalida: string;
  horasExtras: number;
  estado: string;
  observaciones?: string;
}

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="asistencia-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="page-title-icon">📋</span>
            Asistencia
          </h1>
          <p class="page-subtitle">Control de asistencia y horas extras</p>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon stat-icon-green">👥</div>
          <div class="stat-content">
            <h4>Total Registros</h4>
            <span class="stat-value">{{ asistencia.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-blue">✅</div>
          <div class="stat-content">
            <h4>Puntuales</h4>
            <span class="stat-value">{{ getPuntuales() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-orange">⏰</div>
          <div class="stat-content">
            <h4>Atrasos</h4>
            <span class="stat-value">{{ getAtrasos() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-purple">�️</div>
          <div class="stat-content">
            <h4>Horas Extras</h4>
            <span class="stat-value">{{ getHorasExtras() }}h</span>
          </div>
        </div>
      </div>
      
      <div class="search-bar">
        <div class="search-input-wrapper">
          <input type="text" [(ngModel)]="busqueda" (input)="filtrarAsistencia()" placeholder="Buscar empleado..." />
        </div>
        <button (click)="abrirModal()">+ Registrar Asistencia</button>
      </div>
      
      <div class="asistencia-grid">
        <div class="asistencia-card" *ngFor="let a of asistenciaFiltradas">
          <div class="card-header">
            <h3>{{ a.nombreEmpleado }}</h3>
            <span class="status-badge" [class.status-puntual]="a.estado === 'PUNTUAL'" [class.status-atraso]="a.estado === 'ATRASO'" [class.status-falta]="a.estado === 'FALTA'">{{ a.estado }}</span>
          </div>
          <div class="card-body">
            <p>
              <span class="card-icon">📅</span>
              <span class="card-label">Fecha:</span>
              <span class="card-value">{{ a.fecha | date:'dd/MM/yyyy' }}</span>
            </p>
            <p>
              <span class="card-icon">➡️</span>
              <span class="card-label">Entrada:</span>
              <span class="card-value">{{ a.horaEntrada }}</span>
            </p>
            <p>
              <span class="card-icon">⬅️</span>
              <span class="card-label">Salida:</span>
              <span class="card-value">{{ a.horaSalida }}</span>
            </p>
            <p *ngIf="a.horasExtras > 0">
              <span class="card-icon">⏱️</span>
              <span class="card-label">Horas Extras:</span>
              <span class="card-value">{{ a.horasExtras }}h</span>
            </p>
          </div>
          <div class="card-footer">
            <button class="card-action card-action-secondary" (click)="eliminarAsistencia(a.id!)">Eliminar</button>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="mostrarModal" (click)="cerrarModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Registrar Asistencia</h2>
            <button class="close-btn" (click)="cerrarModal()">×</button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="guardarAsistencia()">
              <div class="form-row">
                <div class="form-group">
                  <label>Empleado *</label>
                  <select [(ngModel)]="nuevaAsistencia.empleadoId" name="empleadoId" required>
                    <option value="">Seleccionar...</option>
                    <option *ngFor="let emp of empleados" [value]="emp.id">{{ emp.nombre }} {{ emp.apellido }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Fecha *</label>
                  <input type="date" [(ngModel)]="nuevaAsistencia.fecha" name="fecha" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Hora Entrada *</label>
                  <input type="time" [(ngModel)]="nuevaAsistencia.horaEntrada" name="horaEntrada" required>
                </div>
                <div class="form-group">
                  <label>Hora Salida</label>
                  <input type="time" [(ngModel)]="nuevaAsistencia.horaSalida" name="horaSalida">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Horas Extras</label>
                  <input type="number" [(ngModel)]="nuevaAsistencia.horasExtras" name="horasExtras" step="0.5">
                </div>
                <div class="form-group">
                  <label>Estado</label>
                  <select [(ngModel)]="nuevaAsistencia.estado" name="estado">
                    <option value="PUNTUAL">Puntual</option>
                    <option value="ATRASO">Atraso</option>
                    <option value="JUSTIFICADO">Justificado</option>
                    <option value="FALTA">Falta</option>
                  </select>
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-cancelar" (click)="cerrarModal()">Cancelar</button>
                <button type="submit" class="btn-guardar">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .asistencia-container { padding: 20px; }
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
    .asistencia-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .asistencia-card { background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; }
    .card-header { background: linear-gradient(135deg, #1B4332, #2E7D32); color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center; }
    .card-header h3 { margin: 0; font-size: 1.1em; }
    .card-body { padding: 15px; }
    .card-body p { margin: 8px 0; display: flex; align-items: center; gap: 8px; }
    .card-icon { font-size: 1.2em; }
    .card-label { color: #666; flex: 1; }
    .card-value { font-weight: 600; color: #1B4332; }
    .card-footer { padding: 15px; border-top: 1px solid #e0e0e0; }
    .card-action { width: 100%; padding: 8px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .card-action-secondary { background: #f5f5f5; color: #666; }
    .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 0.8em; font-weight: bold; }
    .status-puntual { background: #28a745; color: white; }
    .status-atraso { background: #ffc107; color: #333; }
    .status-falta { background: #dc3545; color: white; }
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
export class AsistenciaComponent implements OnInit {
  asistencia: Asistencia[] = [];
  asistenciaFiltradas: Asistencia[] = [];
  empleados: any[] = [];
  busqueda: string = '';
  mostrarModal: boolean = false;
  
  nuevaAsistencia: Asistencia = {
    empleadoId: 0,
    nombreEmpleado: '',
    fecha: new Date().toISOString().split('T')[0],
    horaEntrada: '08:00',
    horaSalida: '17:00',
    horasExtras: 0,
    estado: 'PUNTUAL'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarAsistencia();
    this.cargarEmpleados();
  }

  cargarAsistencia() {
    this.http.get<Asistencia[]>('/api/asistencia').subscribe({
      next: (data) => {
        this.asistencia = data;
        this.asistenciaFiltradas = data;
      },
      error: (err) => console.error('Error:', err)
    });
  }

  cargarEmpleados() {
    this.http.get<any[]>('/api/empleados').subscribe({
      next: (data) => this.empleados = data,
      error: (err) => console.error('Error:', err)
    });
  }

  filtrarAsistencia() {
    const b = this.busqueda.toLowerCase();
    this.asistenciaFiltradas = this.asistencia.filter(a =>
      a.nombreEmpleado?.toLowerCase().includes(b)
    );
  }

  getPuntuales(): number {
    return this.asistencia.filter(a => a.estado === 'PUNTUAL').length;
  }

  getAtrasos(): number {
    return this.asistencia.filter(a => a.estado === 'ATRASO').length;
  }

  getHorasExtras(): number {
    return this.asistencia.reduce((sum, a) => sum + (a.horasExtras || 0), 0);
  }

  abrirModal() {
    this.nuevaAsistencia = {
      empleadoId: 0,
      nombreEmpleado: '',
      fecha: new Date().toISOString().split('T')[0],
      horaEntrada: '08:00',
      horaSalida: '17:00',
      horasExtras: 0,
      estado: 'PUNTUAL'
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarAsistencia() {
    const emp = this.empleados.find(e => e.id === this.nuevaAsistencia.empleadoId);
    if (emp) {
      this.nuevaAsistencia.nombreEmpleado = emp.nombre + ' ' + emp.apellido;
    }
    this.http.post<Asistencia>('/api/asistencia', this.nuevaAsistencia).subscribe({
      next: (guardado) => {
        this.asistencia.push(guardado);
        this.filtrarAsistencia();
        this.cerrarModal();
        alert('Asistencia registrada!');
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Error al registrar');
      }
    });
  }

  eliminarAsistencia(id: number) {
    if (confirm('¿Eliminar?')) {
      this.http.delete(`/api/asistencia/${id}`).subscribe({
        next: () => {
          this.asistencia = this.asistencia.filter(a => a.id !== id);
          this.filtrarAsistencia();
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }
}
