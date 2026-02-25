import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Vacacion {
  id?: number;
  empleadoId: number;
  nombreEmpleado: string;
  periodoVacacional: string;
  fechaInicio: string;
  fechaFin: string;
  dias: number;
  diasTotales: number;
  estado: string;
  fechaSolicitud: string;
  fechaAprobacion?: string;
  fechaRechazo?: string;
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
          <div class="stat-icon stat-icon-red">❌</div>
          <div class="stat-content">
            <h4>Rechazadas</h4>
            <span class="stat-value">{{ getRechazadas() }}</span>
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
          <div class="card-header" [class.estado-aprobada]="vac.estado === 'APROBADO'" [class.estado-rechazada]="vac.estado === 'RECHAZADO'" [class.estado-pendiente]="vac.estado === 'PENDIENTE'">
            <span class="estado-badge">{{ getEstadoTexto(vac.estado) }}</span>
          </div>
          <div class="card-body">
            <p>
              <span class="card-icon">👤</span>
              <span class="card-label">Empleado:</span>
              <span class="card-value">{{ vac.nombreEmpleado }}</span>
            </p>
            <p>
              <span class="card-icon">📅</span>
              <span class="card-label">Período:</span>
              <span class="card-value">{{ vac.periodoVacacional }}</span>
            </p>
            <p>
              <span class="card-icon">📆</span>
              <span class="card-label">Días:</span>
              <span class="card-value">{{ vac.dias }} de {{ vac.diasTotales }}</span>
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
          </div>
          <div class="card-footer">
            <button class="card-action card-action-danger" (click)="eliminarVacacion(vac.id!)">Eliminar</button>
            <button class="card-action card-action-primary" (click)="abrirDetalles(vac)">Ver Detalles</button>
          </div>
        </div>
      </div>

      <!-- Modal de Solicitar Vacaciones -->
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
                  <label>Período Vacacional *</label>
                  <input type="text" [(ngModel)]="nuevaVacacion.periodoVacacional" name="periodoVacacional" placeholder="2026-03" required>
                </div>
                <div class="form-group">
                  <label>Días *</label>
                  <input type="number" [(ngModel)]="nuevaVacacion.dias" name="dias" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Días Totales</label>
                  <input type="number" [(ngModel)]="nuevaVacacion.diasTotales" name="diasTotales" value="25">
                </div>
                <div class="form-group">
                  <label>Estado</label>
                  <select [(ngModel)]="nuevaVacacion.estado" name="estado">
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="APROBADO">APROBADO</option>
                    <option value="RECHAZADO">RECHAZADO</option>
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

      <!-- Modal de Detalles -->
      <div class="modal-overlay" *ngIf="mostrarModalDetalles" (click)="cerrarDetalles()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header" [class.header-aprobada]="vacacionSeleccionada?.estado === 'APROBADO'" [class.header-rechazada]="vacacionSeleccionada?.estado === 'RECHAZADO'" [class.header-pendiente]="vacacionSeleccionada?.estado === 'PENDIENTE'">
            <h2>Detalles de Solicitud</h2>
            <button class="close-btn" (click)="cerrarDetalles()">×</button>
          </div>
          <div class="modal-body">
            <div class="detalle-row">
              <span class="detalle-label">Estado:</span>
              <span class="detalle-value estado" [class.estado-aprobada]="vacacionSeleccionada?.estado === 'APROBADO'" [class.estado-rechazada]="vacacionSeleccionada?.estado === 'RECHAZADO'" [class.estado-pendiente]="vacacionSeleccionada?.estado === 'PENDIENTE'">{{ getEstadoTexto(vacacionSeleccionada?.estado || '') }}</span>
            </div>
            <div class="detalle-row">
              <span class="detalle-label">Empleado:</span>
              <span class="detalle-value">{{ vacacionSeleccionada?.nombreEmpleado }}</span>
            </div>
            <div class="detalle-row">
              <span class="detalle-label">ID Empleado:</span>
              <span class="detalle-value">{{ vacacionSeleccionada?.empleadoId }}</span>
            </div>
            <div class="detalle-row">
              <span class="detalle-label">Período:</span>
              <span class="detalle-value">{{ vacacionSeleccionada?.periodoVacacional }}</span>
            </div>
            <div class="detalle-row">
              <span class="detalle-label">Días Solicitados:</span>
              <span class="detalle-value">{{ vacacionSeleccionada?.dias }}</span>
            </div>
            <div class="detalle-row">
              <span class="detalle-label">Días Totales:</span>
              <span class="detalle-value">{{ vacacionSeleccionada?.diasTotales }}</span>
            </div>
            <div class="detalle-row">
              <span class="detalle-label">Fecha Solicitud:</span>
              <span class="detalle-value">{{ vacacionSeleccionada?.fechaSolicitud | date:'dd/MM/yyyy' }}</span>
            </div>
            <div class="detalle-row" *ngIf="vacacionSeleccionada?.motivoRechazo">
              <span class="detalle-label">Motivo de Rechazo:</span>
              <span class="detalle-value">{{ vacacionSeleccionada?.motivoRechazo }}</span>
            </div>
            
            <div class="acciones-container" *ngIf="vacacionSeleccionada?.estado === 'PENDIENTE'">
              <h3>Acciones</h3>
              <div class="form-group">
                <label>Motivo (para rechazo):</label>
                <input type="text" [(ngModel)]="motivoRechazo" placeholder="Ingrese el motivo...">
              </div>
              <div class="botones-accion">
                <button class="btn-aprobar" (click)="aprobarVacacion()">✅ Aprobar</button>
                <button class="btn-rechazar" (click)="rechazarVacacion()">❌ Rechazar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: white; border-radius: 16px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    .modal-header { padding: 1.5rem; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; }
    .modal-header.header-pendiente { background: #fff3cd; }
    .modal-header.header-aprobada { background: #d4edda; }
    .modal-header.header-rechazada { background: #f8d7da; }
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
    
    .card-header { padding: 1rem; border-radius: 16px 16px 0 0; }
    .estado-badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-weight: 600; font-size: 0.85rem; }
    .estado-pendiente .estado-badge { background: #fff3cd; color: #856404; }
    .estado-aprobada .estado-badge { background: #d4edda; color: #155724; }
    .estado-rechazada .estado-badge { background: #f8d7da; color: #721c24; }
    
    .detalle-row { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #eee; }
    .detalle-label { font-weight: 600; color: #1B4332; }
    .detalle-value { color: #666; }
    .detalle-value.estado { font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 20px; }
    .estado-pendiente { background: #fff3cd; color: #856404; }
    .estado-aprobada { background: #d4edda; color: #155724; }
    .estado-rechazada { background: #f8d7da; color: #721c24; }
    
    .acciones-container { margin-top: 1.5rem; padding-top: 1rem; border-top: 2px solid #eee; }
    .acciones-container h3 { margin: 0 0 1rem 0; color: #1B4332; }
    .botones-accion { display: flex; gap: 1rem; margin-top: 1rem; }
    .btn-aprobar { flex: 1; padding: 0.75rem; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .btn-aprobar:hover { background: #218838; }
    .btn-rechazar { flex: 1; padding: 0.75rem; background: #dc3545; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .btn-rechazar:hover { background: #c82333; }
  `]
})
export class VacacionesComponent implements OnInit {
  vacaciones: Vacacion[] = [];
  vacacionesFiltradas: Vacacion[] = [];
  busqueda: string = '';
  mostrarModal: boolean = false;
  mostrarModalDetalles: boolean = false;
  vacacionSeleccionada: Vacacion | null = null;
  motivoRechazo: string = '';
  
  nuevaVacacion: Vacacion = {
    empleadoId: 0,
    nombreEmpleado: '',
    periodoVacacional: '',
    dias: 0,
    diasTotales: 25,
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

  getEstadoTexto(estado: string): string {
    switch(estado) {
      case 'APROBADO':
      case 'APROBADA': 
        return 'Aprobada';
      case 'RECHAZADO':
      case 'RECHAZADA': 
        return 'Rechazada';
      case 'PENDIENTE': 
        return 'Pendiente';
      default: return estado;
    }
  }

  getEstadoClass(estado: string): string {
    switch(estado) {
      case 'APROBADO':
      case 'APROBADA': 
        return 'estado-aprobada';
      case 'RECHAZADO':
      case 'RECHAZADA': 
        return 'estado-rechazada';
      case 'PENDIENTE': 
        return 'estado-pendiente';
      default: return '';
    }
  }

  getAprobadas(): number {
    return this.vacaciones.filter(v => v.estado === 'APROBADO' || v.estado === 'APROBADA').length;
  }

  getPendientes(): number {
    return this.vacaciones.filter(v => v.estado === 'PENDIENTE').length;
  }

  getRechazadas(): number {
    return this.vacaciones.filter(v => v.estado === 'RECHAZADO' || v.estado === 'RECHAZADA').length;
  }

  abrirModal() {
    this.nuevaVacacion = {
      empleadoId: 0,
      nombreEmpleado: '',
      periodoVacacional: '',
      dias: 0,
      diasTotales: 25,
      estado: 'PENDIENTE',
      fechaSolicitud: new Date().toISOString().split('T')[0]
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  abrirDetalles(vac: Vacacion) {
    this.vacacionSeleccionada = { ...vac };
    this.motivoRechazo = '';
    this.mostrarModalDetalles = true;
  }

  cerrarDetalles() {
    this.mostrarModalDetalles = false;
    this.vacacionSeleccionada = null;
    this.motivoRechazo = '';
  }

  aprobarVacacion() {
    if (!this.vacacionSeleccionada?.id) return;
    
    const updatedVacacion = {
      ...this.vacacionSeleccionada,
      estado: 'APROBADO',
      fechaAprobacion: new Date().toISOString().split('T')[0]
    };
    
    this.http.put<Vacacion>(`/api/vacaciones/${this.vacacionSeleccionada.id}`, updatedVacacion).subscribe({
      next: (vacacionActualizada) => {
        const index = this.vacaciones.findIndex(v => v.id === vacacionActualizada.id);
        if (index !== -1) {
          this.vacaciones[index] = vacacionActualizada;
          this.filtrarVacaciones();
        }
        this.cerrarDetalles();
        alert('Vacación aprobada exitosamente!');
      },
      error: (err) => {
        console.error('Error aprobando vacaciones:', err);
        alert('Error al aprobar vacaciones');
      }
    });
  }

  rechazarVacacion() {
    if (!this.vacacionSeleccionada?.id) return;
    
    if (!this.motivoRechazo) {
      alert('Por favor ingrese el motivo del rechazo');
      return;
    }
    
    const updatedVacacion = {
      ...this.vacacionSeleccionada,
      estado: 'RECHAZADO',
      motivoRechazo: this.motivoRechazo,
      fechaRechazo: new Date().toISOString().split('T')[0]
    };
    
    this.http.put<Vacacion>(`/api/vacaciones/${this.vacacionSeleccionada.id}`, updatedVacacion).subscribe({
      next: (vacacionActualizada) => {
        const index = this.vacaciones.findIndex(v => v.id === vacacionActualizada.id);
        if (index !== -1) {
          this.vacaciones[index] = vacacionActualizada;
          this.filtrarVacaciones();
        }
        this.cerrarDetalles();
        alert('Vacación rechazada');
      },
      error: (err) => {
        console.error('Error rechazando vacaciones:', err);
        alert('Error al rechazar vacaciones');
      }
    });
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
