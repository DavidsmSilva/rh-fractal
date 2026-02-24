import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Vacacion {
  id?: number;
  empleadoId: number;
  nombreEmpleado: string;
  fechaInicio: string;
  fechaFin: string;
  dias: number;
  estado: string;
  fechaSolicitud: string;
  motivoRechazo?: string;
}

@Component({
  selector: 'app-vacaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="vacaciones-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="page-title-icon">🏖️</span>
            Vacaciones
          </h1>
          <p class="page-subtitle">Gestión de permisos y vacaciones del personal</p>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon stat-icon-green">✈️</div>
          <div class="stat-content">
            <h4>Solicitadas</h4>
            <span class="stat-value">{{ vacaciones.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-blue">✅</div>
          <div class="stat-content">
            <h4>Aprobadas</h4>
            <span class="stat-value">{{ getAprobadas() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-orange">⏳</div>
          <div class="stat-content">
            <h4>Pendientes</h4>
            <span class="stat-value">{{ getPendientes() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-purple">📅</div>
          <div class="stat-content">
            <h4>Días Totales</h4>
            <span class="stat-value">{{ getDiasTotales() }}</span>
          </div>
        </div>
      </div>
      
      <div class="search-bar">
        <div class="search-input-wrapper">
          <input type="text" [(ngModel)]="busqueda" (input)="filtrarVacaciones()" placeholder="Buscar empleado..." />
        </div>
        <button (click)="abrirModal()">+ Solicitar Vacaciones</button>
      </div>
      
      <div class="vacaciones-grid">
        <div class="vacacion-card" *ngFor="let vac of vacacionesFiltradas">
          <div class="card-header">
            <h3>{{ vac.nombreEmpleado }}</h3>
          </div>
          <div class="card-body">
            <p>
              <span class="card-icon">📅</span>
              <span class="card-label">Período:</span>
              <span class="card-value">{{ vac.fechaInicio | date:'dd/MM/yyyy' }} - {{ vac.fechaFin | date:'dd/MM/yyyy' }}</span>
            </p>
            <p>
              <span class="card-icon">📆</span>
              <span class="card-label">Días:</span>
              <span class="card-value">{{ vac.dias }}</span>
            </p>
            <p>
              <span class="card-icon">📝</span>
              <span class="card-label">Fecha Solicitud:</span>
              <span class="card-value">{{ vac.fechaSolicitud | date:'dd/MM/yyyy' }}</span>
            </p>
            <p *ngIf="vac.motivoRechazo">
              <span class="card-icon">❌</span>
              <span class="card-label">Motivo:</span>
              <span class="card-value">{{ vac.motivoRechazo }}</span>
            </p>
            <p>
              <span class="card-icon">📊</span>
              <span class="card-label">Estado:</span>
              <span class="status-badge" [class.status-active]="vac.estado === 'APROBADA'" [class.status-pending]="vac.estado !== 'APROBADA'">{{ vac.estado }}</span>
            </p>
          </div>
          <div class="card-footer">
            <button class="card-action card-action-secondary" (click)="eliminarVacacion(vac.id!)">Eliminar</button>
            <button class="card-action card-action-primary">Ver Detalles</button>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="mostrarModal" (click)="cerrarModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Solicitar Vacaciones</h2>
            <button class="close-btn" (click)="cerrarModal()">×</button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="guardarVacacion()">
              <div class="form-row">
                <div class="form-group">
                  <label>Nombre Empleado *</label>
                  <input type="text" [(ngModel)]="nuevaVacacion.nombreEmpleado" name="nombreEmpleado" required>
                </div>
                <div class="form-group">
                  <label>ID Empleado</label>
                  <input type="number" [(ngModel)]="nuevaVacacion.empleadoId" name="empleadoId">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Fecha Inicio *</label>
                  <input type="date" [(ngModel)]="nuevaVacacion.fechaInicio" name="fechaInicio" required>
                </div>
                <div class="form-group">
                  <label>Fecha Fin *</label>
                  <input type="date" [(ngModel)]="nuevaVacacion.fechaFin" name="fechaFin" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Días *</label>
                  <input type="number" [(ngModel)]="nuevaVacacion.dias" name="dias" required>
                </div>
                <div class="form-group">
                  <label>Fecha Solicitud</label>
                  <input type="date" [(ngModel)]="nuevaVacacion.fechaSolicitud" name="fechaSolicitud">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Estado</label>
                  <select [(ngModel)]="nuevaVacacion.estado" name="estado">
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="APROBADA">APROBADA</option>
                    <option value="RECHAZADA">RECHAZADA</option>
                  </select>
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-cancelar" (click)="cerrarModal()">Cancelar</button>
                <button type="submit" class="btn-guardar">Guardar Solicitud</button>
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
    .form-group input, .form-group select { padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 0.95rem; transition: border-color 0.3s; }
    .form-group input:focus, .form-group select:focus { outline: none; border-color: #2E7D32; }
    .form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .btn-cancelar, .btn-guardar { flex: 1; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; }
    .btn-cancelar { background: #f5f5f5; border: 2px solid #ddd; color: #666; }
    .btn-cancelar:hover { background: #e0e0e0; }
    .btn-guardar { background: linear-gradient(135deg, #2E7D32, #1B5E20); border: none; color: white; }
    .btn-guardar:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(46,125,50,0.3); }
  `]
})
export class VacacionesComponent implements OnInit {
  vacaciones: Vacacion[] = [];
  vacacionesFiltradas: Vacacion[] = [];
  busqueda: string = '';
  mostrarModal: boolean = false;
  
  nuevaVacacion: Vacacion = {
    empleadoId: 0,
    nombreEmpleado: '',
    fechaInicio: '',
    fechaFin: '',
    dias: 0,
    estado: 'PENDIENTE',
    fechaSolicitud: new Date().toISOString().split('T')[0]
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarVacaciones();
  }

  cargarVacaciones() {
    this.http.get<Vacacion[]>('/api/vacaciones').subscribe({
      next: (data) => {
        this.vacaciones = data;
        this.vacacionesFiltradas = data;
      },
      error: (err) => console.error('Error cargando vacaciones:', err)
    });
  }

  filtrarVacaciones() {
    const busquedaLower = this.busqueda.toLowerCase();
    this.vacacionesFiltradas = this.vacaciones.filter(vac =>
      vac.nombreEmpleado?.toLowerCase().includes(busquedaLower)
    );
  }

  getAprobadas(): number {
    return this.vacaciones.filter(v => v.estado === 'APROBADA').length;
  }

  getPendientes(): number {
    return this.vacaciones.filter(v => v.estado === 'PENDIENTE').length;
  }

  getDiasTotales(): number {
    return this.vacaciones.reduce((sum, vac) => sum + (vac.dias || 0), 0);
  }

  abrirModal() {
    this.nuevaVacacion = {
      empleadoId: 0,
      nombreEmpleado: '',
      fechaInicio: '',
      fechaFin: '',
      dias: 0,
      estado: 'PENDIENTE',
      fechaSolicitud: new Date().toISOString().split('T')[0]
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarVacacion() {
    this.http.post<Vacacion>('/api/vacaciones', this.nuevaVacacion).subscribe({
      next: (vacacionGuardada) => {
        this.vacaciones.push(vacacionGuardada);
        this.filtrarVacaciones();
        this.cerrarModal();
        alert('Vacaciones solicitadas exitosamente!');
      },
      error: (err) => {
        console.error('Error guardando vacaciones:', err);
        alert('Error al guardar vacaciones');
      }
    });
  }

  eliminarVacacion(id: number) {
    if (confirm('¿Estás seguro de eliminar esta solicitud?')) {
      this.http.delete(`/api/vacaciones/${id}`).subscribe({
        next: () => {
          this.vacaciones = this.vacaciones.filter(v => v.id !== id);
          this.filtrarVacaciones();
          alert('Solicitud eliminada');
        },
        error: (err) => {
          console.error('Error eliminando vacaciones:', err);
          alert('Error al eliminar solicitud');
        }
      });
    }
  }
}
