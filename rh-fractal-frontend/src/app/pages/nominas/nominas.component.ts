import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Nomina {
  id?: number;
  periodo: string;
  nombreEmpleado: string;
  totalDevengado: number;
  totalDeducciones: number;
  totalNeto: number;
  fechaPago: string;
  estado: string;
}

@Component({
  selector: 'app-nominas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="nominas-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="page-title-icon">💳</span>
            Nómina
          </h1>
          <p class="page-subtitle">Gestión de payroll y compensación de empleados</p>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon stat-icon-green">💰</div>
          <div class="stat-content">
            <h4>Nómina Mensual</h4>
            <span class="stat-value">{{ getNominaMensual() | currency:'USD':'symbol':'1.0-0' }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-blue">👥</div>
          <div class="stat-content">
            <h4>Total Períodos</h4>
            <span class="stat-value">{{ nominas.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-purple">📉</div>
          <div class="stat-content">
            <h4>Total Deducciones</h4>
            <span class="stat-value">{{ getTotalDeducciones() | currency:'USD':'symbol':'1.0-0' }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-orange">✅</div>
          <div class="stat-content">
            <h4>Pagado</h4>
            <span class="stat-value">{{ getTotalPagado() | currency:'USD':'symbol':'1.0-0' }}</span>
          </div>
        </div>
      </div>
      
      <div class="search-bar">
        <div class="search-input-wrapper">
          <input type="text" [(ngModel)]="busqueda" (input)="filtrarNominas()" placeholder="Buscar período..." />
        </div>
        <button (click)="abrirModal()">+ Generar Nómina</button>
      </div>
      
      <div class="nominas-grid">
        <div class="nomina-card" *ngFor="let nom of nominasFiltradas">
          <div class="card-header">
            <h3>{{ nom.periodo }}</h3>
            <span class="empleado-badge">{{ nom.nombreEmpleado }}</span>
          </div>
          <div class="card-body">
            <p>
              <span class="card-icon">➕</span>
              <span class="card-label">Total Devengado:</span>
              <span class="card-value">{{ nom.totalDevengado | currency:'USD':'symbol':'1.0-0' }}</span>
            </p>
            <p>
              <span class="card-icon">➖</span>
              <span class="card-label">Deducciones:</span>
              <span class="card-value">{{ nom.totalDeducciones | currency:'USD':'symbol':'1.0-0' }}</span>
            </p>
            <p>
              <span class="card-icon">💵</span>
              <span class="card-label">Total Neto:</span>
              <span class="card-value">{{ nom.totalNeto | currency:'USD':'symbol':'1.0-0' }}</span>
            </p>
            <p>
              <span class="card-icon">📅</span>
              <span class="card-label">Fecha Pago:</span>
              <span class="card-value">{{ nom.fechaPago | date:'dd/MM/yyyy' }}</span>
            </p>
            <p>
              <span class="card-icon">📊</span>
              <span class="card-label">Estado:</span>
              <span class="status-badge" [class.status-active]="nom.estado === 'PAGADA'" [class.status-pending]="nom.estado !== 'PAGADA'">{{ nom.estado }}</span>
            </p>
          </div>
          <div class="card-footer">
            <button class="card-action card-action-secondary" (click)="eliminarNomina(nom.id!)">Eliminar</button>
            <button class="card-action card-action-primary">Descargar</button>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="mostrarModal" (click)="cerrarModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Generar Nómina</h2>
            <button class="close-btn" (click)="cerrarModal()">×</button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="guardarNomina()">
              <div class="form-row">
                <div class="form-group">
                  <label>Período *</label>
                  <input type="text" [(ngModel)]="nuevaNomina.periodo" name="periodo" placeholder="Ej: Enero 2026" required>
                </div>
                <div class="form-group">
                  <label>Fecha Pago *</label>
                  <input type="date" [(ngModel)]="nuevaNomina.fechaPago" name="fechaPago" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Total Devengado *</label>
                  <input type="number" [(ngModel)]="nuevaNomina.totalDevengado" name="totalDevengado" required>
                </div>
                <div class="form-group">
                  <label>Total Deducciones *</label>
                  <input type="number" [(ngModel)]="nuevaNomina.totalDeducciones" name="totalDeducciones" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Total Neto</label>
                  <input type="number" [value]="calcularTotalNeto()" name="totalNeto" readonly>
                </div>
                <div class="form-group">
                  <label>Estado</label>
                  <select [(ngModel)]="nuevaNomina.estado" name="estado">
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="PAGADA">PAGADA</option>
                  </select>
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-cancelar" (click)="cerrarModal()">Cancelar</button>
                <button type="submit" class="btn-guardar">Guardar Nómina</button>
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
    .form-group input[readonly] { background: #f5f5f5; }
    .form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .btn-cancelar, .btn-guardar { flex: 1; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; }
    .btn-cancelar { background: #f5f5f5; border: 2px solid #ddd; color: #666; }
    .btn-cancelar:hover { background: #e0e0e0; }
    .btn-guardar { background: linear-gradient(135deg, #2E7D32, #1B5E20); border: none; color: white; }
    .btn-guardar:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(46,125,50,0.3); }
    .empleado-badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; margin-top: 0.25rem; }
  `]
})
export class NominasComponent implements OnInit {
  nominas: Nomina[] = [];
  nominasFiltradas: Nomina[] = [];
  busqueda: string = '';
  mostrarModal: boolean = false;
  
  nuevaNomina: Nomina = {
    periodo: '',
    nombreEmpleado: '',
    totalDevengado: 0,
    totalDeducciones: 0,
    totalNeto: 0,
    fechaPago: '',
    estado: 'PENDIENTE'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarNominas();
  }

  cargarNominas() {
    this.http.get<Nomina[]>('/api/nominas').subscribe({
      next: (data) => {
        this.nominas = data;
        this.nominasFiltradas = data;
      },
      error: (err) => console.error('Error cargando nóminas:', err)
    });
  }

  filtrarNominas() {
    const busquedaLower = this.busqueda.toLowerCase();
    this.nominasFiltradas = this.nominas.filter(nom =>
      nom.periodo.toLowerCase().includes(busquedaLower)
    );
  }

  getNominaMensual(): number {
    if (this.nominas.length > 0) {
      return this.nominas[this.nominas.length - 1].totalNeto || 0;
    }
    return 0;
  }

  getTotalDeducciones(): number {
    return this.nominas.reduce((sum, nom) => sum + (nom.totalDeducciones || 0), 0);
  }

  getTotalPagado(): number {
    return this.nominas
      .filter(nom => nom.estado === 'PAGADA')
      .reduce((sum, nom) => sum + (nom.totalNeto || 0), 0);
  }

  abrirModal() {
    this.nuevaNomina = {
      periodo: '',
      totalDevengado: 0,
      totalDeducciones: 0,
      totalNeto: 0,
      fechaPago: '',
      estado: 'PENDIENTE'
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  calcularTotalNeto(): number {
    return (this.nuevaNomina.totalDevengado || 0) - (this.nuevaNomina.totalDeducciones || 0);
  }

  guardarNomina() {
    this.nuevaNomina.totalNeto = this.calcularTotalNeto();
    this.http.post<Nomina>('/api/nominas', this.nuevaNomina).subscribe({
      next: (nominaGuardada) => {
        this.nominas.push(nominaGuardada);
        this.filtrarNominas();
        this.cerrarModal();
        alert('Nómina guardada exitosamente!');
      },
      error: (err) => {
        console.error('Error guardando nómina:', err);
        alert('Error al guardar nómina');
      }
    });
  }

  eliminarNomina(id: number) {
    if (confirm('¿Estás seguro de eliminar esta nómina?')) {
      this.http.delete(`/api/nominas/${id}`).subscribe({
        next: () => {
          this.nominas = this.nominas.filter(n => n.id !== id);
          this.filtrarNominas();
          alert('Nómina eliminada');
        },
        error: (err) => {
          console.error('Error eliminando nómina:', err);
          alert('Error al eliminar nómina');
        }
      });
    }
  }
}
