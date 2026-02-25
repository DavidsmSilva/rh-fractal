import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Postulacion {
  id?: number;
  nombre: string;
  email: string;
  telefono: string;
  cargoAplicado: string;
  estado: string;
  fechaPostulacion: string;
  observaciones?: string;
}

@Component({
  selector: 'app-reclutamiento',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="reclutamiento-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="page-title-icon">👥</span>
            Reclutamiento
          </h1>
          <p class="page-subtitle">Gestión de postulaciones y selección de personal</p>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon stat-icon-blue">📋</div>
          <div class="stat-content">
            <h4>Total Postulaciones</h4>
            <span class="stat-value">{{ postulaciones.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-orange">📨</div>
          <div class="stat-content">
            <h4>Recibidas</h4>
            <span class="stat-value">{{ getRecibidas() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-purple">💼</div>
          <div class="stat-content">
            <h4>Entrevista</h4>
            <span class="stat-value">{{ getEntrevista() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-green">✅</div>
          <div class="stat-content">
            <h4>Contratados</h4>
            <span class="stat-value">{{ getContratados() }}</span>
          </div>
        </div>
      </div>
      
      <div class="search-bar">
        <div class="search-input-wrapper">
          <input type="text" [(ngModel)]="busqueda" (input)="filtrarPostulaciones()" placeholder="Buscar postulación..." />
        </div>
        <button (click)="abrirModal()">+ Nueva Postulación</button>
      </div>
      
      <div class="kanban-board">
        <div class="kanban-column">
          <h3 class="column-title received">📨 Recibidas</h3>
          <div class="kanban-card" *ngFor="let p of getPorEstado('RECIBIDO')">
            <div class="card-name">{{ p.nombre }}</div>
            <div class="card-cargo">{{ p.cargoAplicado }}</div>
            <div class="card-date">{{ p.fechaPostulacion | date:'dd/MM/yyyy' }}</div>
            <div class="card-actions">
              <button (click)="cambiarEstado(p, 'ENTREVISTA')">→ Entrevista</button>
              <button class="reject" (click)="cambiarEstado(p, 'RECHAZADO')">✗</button>
            </div>
          </div>
        </div>
        <div class="kanban-column">
          <h3 class="column-title interview">💼 Entrevista</h3>
          <div class="kanban-card" *ngFor="let p of getPorEstado('ENTREVISTA')">
            <div class="card-name">{{ p.nombre }}</div>
            <div class="card-cargo">{{ p.cargoAplicado }}</div>
            <div class="card-date">{{ p.fechaPostulacion | date:'dd/MM/yyyy' }}</div>
            <div class="card-actions">
              <button (click)="cambiarEstado(p, 'CONTRATADO')">✅ Contratar</button>
              <button class="reject" (click)="cambiarEstado(p, 'RECHAZADO')">✗</button>
            </div>
          </div>
        </div>
        <div class="kanban-column">
          <h3 class="column-title hired">✅ Contratados</h3>
          <div class="kanban-card hired-card" *ngFor="let p of getPorEstado('CONTRATADO')">
            <div class="card-name">{{ p.nombre }}</div>
            <div class="card-cargo">{{ p.cargoAplicado }}</div>
            <div class="card-date">{{ p.fechaPostulacion | date:'dd/MM/yyyy' }}</div>
          </div>
        </div>
        <div class="kanban-column">
          <h3 class="column-title rejected">❌ Rechazados</h3>
          <div class="kanban-card rejected-card" *ngFor="let p of getPorEstado('RECHAZADO')">
            <div class="card-name">{{ p.nombre }}</div>
            <div class="card-cargo">{{ p.cargoAplicado }}</div>
            <div class="card-date">{{ p.fechaPostulacion | date:'dd/MM/yyyy' }}</div>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="mostrarModal" (click)="cerrarModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Nueva Postulación</h2>
            <button class="close-btn" (click)="cerrarModal()">×</button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="guardarPostulacion()">
              <div class="form-row">
                <div class="form-group">
                  <label>Nombre *</label>
                  <input type="text" [(ngModel)]="nuevaPostulacion.nombre" name="nombre" required>
                </div>
                <div class="form-group">
                  <label>Email *</label>
                  <input type="email" [(ngModel)]="nuevaPostulacion.email" name="email" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Teléfono *</label>
                  <input type="text" [(ngModel)]="nuevaPostulacion.telefono" name="telefono" required>
                </div>
                <div class="form-group">
                  <label>Cargo Aplicado *</label>
                  <input type="text" [(ngModel)]="nuevaPostulacion.cargoAplicado" name="cargoAplicado" required>
                </div>
              </div>
              <div class="form-group">
                <label>Observaciones</label>
                <textarea [(ngModel)]="nuevaPostulacion.observaciones" name="observaciones" rows="3"></textarea>
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
    .reclutamiento-container { padding: 20px; }
    .page-header { margin-bottom: 20px; }
    .page-title { font-size: 1.8em; color: #1B4332; display: flex; align-items: center; gap: 10px; }
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
    .kanban-board { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
    .kanban-column { background: #f5f5f5; padding: 15px; border-radius: 10px; min-height: 300px; }
    .column-title { margin: 0 0 15px 0; padding: 10px; border-radius: 6px; text-align: center; font-size: 0.95em; }
    .column-title.received { background: #fff3cd; color: #856404; }
    .column-title.interview { background: #e2e3f5; color: #383d41; }
    .column-title.hired { background: #d4edda; color: #155724; }
    .column-title.rejected { background: #f8d7da; color: #721c24; }
    .kanban-card { background: white; padding: 12px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .kanban-card.hired-card { border-left: 4px solid #28a745; }
    .kanban-card.rejected-card { border-left: 4px solid #dc3545; opacity: 0.7; }
    .card-name { font-weight: bold; color: #1B4332; }
    .card-cargo { font-size: 0.85em; color: #666; margin: 5px 0; }
    .card-date { font-size: 0.75em; color: #999; }
    .card-actions { display: flex; gap: 5px; margin-top: 10px; }
    .card-actions button { flex: 1; padding: 5px; font-size: 0.8em; border: none; border-radius: 4px; cursor: pointer; background: #007bff; color: white; }
    .card-actions button.reject { background: #dc3545; flex: 0 0 30px; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: white; border-radius: 16px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
    .modal-header { padding: 1.5rem; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; }
    .modal-header h2 { margin: 0; color: #1B4332; }
    .close-btn { background: none; border: none; font-size: 2rem; cursor: pointer; color: #666; }
    .modal-body { padding: 1.5rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .form-group { display: flex; flex-direction: column; }
    .form-group label { font-size: 0.85rem; color: #1B4332; margin-bottom: 0.25rem; }
    .form-group input, .form-group textarea { padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; }
    .form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .btn-cancelar, .btn-guardar { flex: 1; padding: 0.75rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .btn-cancelar { background: #f5f5f5; border: 2px solid #ddd; color: #666; }
    .btn-guardar { background: linear-gradient(135deg, #2E7D32, #1B5E20); border: none; color: white; }
    @media (max-width: 900px) { .kanban-board { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 600px) { .kanban-board { grid-template-columns: 1fr; } }
  `]
})
export class ReclutamientoComponent implements OnInit {
  postulaciones: Postulacion[] = [];
  busqueda: string = '';
  mostrarModal: boolean = false;
  
  nuevaPostulacion: Postulacion = {
    nombre: '',
    email: '',
    telefono: '',
    cargoAplicado: '',
    estado: 'RECIBIDO',
    fechaPostulacion: new Date().toISOString().split('T')[0],
    observaciones: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarPostulaciones();
  }

  cargarPostulaciones() {
    this.http.get<Postulacion[]>('/api/postulaciones').subscribe({
      next: (data) => this.postulaciones = data,
      error: (err) => console.error('Error:', err)
    });
  }

  filtrarPostulaciones() {
    const b = this.busqueda.toLowerCase();
    this.postulaciones = this.postulaciones.filter(p =>
      p.nombre?.toLowerCase().includes(b) ||
      p.cargoAplicado?.toLowerCase().includes(b)
    );
  }

  getPorEstado(estado: string): Postulacion[] {
    return this.postulaciones.filter(p => p.estado === estado);
  }

  getRecibidas(): number { return this.getPorEstado('RECIBIDO').length; }
  getEntrevista(): number { return this.getPorEstado('ENTREVISTA').length; }
  getContratados(): number { return this.getPorEstado('CONTRATADO').length; }

  cambiarEstado(p: Postulacion, nuevoEstado: string) {
    p.estado = nuevoEstado;
    this.http.put(`/api/postulaciones/${p.id}`, p).subscribe({
      next: () => this.cargarPostulaciones(),
      error: (err) => console.error('Error:', err)
    });
  }

  abrirModal() {
    this.nuevaPostulacion = {
      nombre: '', email: '', telefono: '', cargoAplicado: '',
      estado: 'RECIBIDO', fechaPostulacion: new Date().toISOString().split('T')[0], observaciones: ''
    };
    this.mostrarModal = true;
  }

  cerrarModal() { this.mostrarModal = false; }

  guardarPostulacion() {
    this.http.post<Postulacion>('/api/postulaciones', this.nuevaPostulacion).subscribe({
      next: (guardado) => {
        this.postulaciones.push(guardado);
        this.cerrarModal();
        alert('Postulación guardada!');
      },
      error: (err) => { console.error('Error:', err); alert('Error'); }
    });
  }
}
