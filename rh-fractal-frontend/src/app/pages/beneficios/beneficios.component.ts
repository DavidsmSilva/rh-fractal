import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Beneficio {
  id?: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  cobertura: string;
  valorMensual: number;
  estado: string;
}

@Component({
  selector: 'app-beneficios',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="beneficios-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="page-title-icon">🎁</span>
            Beneficios
          </h1>
          <p class="page-subtitle">Programas de beneficios y bienestar para empleados</p>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon stat-icon-green">🎁</div>
          <div class="stat-content">
            <h4>Total Beneficios</h4>
            <span class="stat-value">{{ beneficios.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-blue">👥</div>
          <div class="stat-content">
            <h4>Activos</h4>
            <span class="stat-value">{{ getBeneficiosActivos() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-purple">💰</div>
          <div class="stat-content">
            <h4>Inversión Anual</h4>
            <span class="stat-value">{{ getInversionTotal() | currency:'USD':'symbol':'1.0-0' }}</span>
          </div>
        </div>
      </div>
      
      <div class="search-bar">
        <div class="search-input-wrapper">
          <input type="text" [(ngModel)]="busqueda" (input)="filtrarBeneficios()" placeholder="Buscar beneficio..." />
        </div>
        <button (click)="abrirModal()">+ Nuevo Beneficio</button>
      </div>
      
      <div class="beneficios-grid">
        <div class="beneficio-card" *ngFor="let ben of beneficiosFiltrados">
          <div class="card-header">
            <h3>{{ ben.nombre }}</h3>
          </div>
          <div class="card-body">
            <p>
              <span class="card-icon">🏷️</span>
              <span class="card-label">Tipo:</span>
              <span class="card-value">{{ ben.tipo }}</span>
            </p>
            <p>
              <span class="card-icon">👥</span>
              <span class="card-label">Cobertura:</span>
              <span class="card-value">{{ ben.cobertura }}</span>
            </p>
            <p>
              <span class="card-icon">💵</span>
              <span class="card-label">Valor Mensual:</span>
              <span class="card-value">{{ ben.valorMensual | currency:'USD':'symbol':'1.0-0' }}</span>
            </p>
            <p>
              <span class="card-icon">📊</span>
              <span class="card-label">Estado:</span>
              <span class="status-badge" [class.status-active]="ben.estado === 'ACTIVO'" [class.status-pending]="ben.estado !== 'ACTIVO'">{{ ben.estado }}</span>
            </p>
          </div>
          <div class="card-footer">
            <button class="card-action card-action-secondary" (click)="eliminarBeneficio(ben.id!)">Eliminar</button>
            <button class="card-action card-action-primary">Ver Detalles</button>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="mostrarModal" (click)="cerrarModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Nuevo Beneficio</h2>
            <button class="close-btn" (click)="cerrarModal()">×</button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="guardarBeneficio()">
              <div class="form-row">
                <div class="form-group">
                  <label>Nombre *</label>
                  <input type="text" [(ngModel)]="nuevoBeneficio.nombre" name="nombre" required>
                </div>
                <div class="form-group">
                  <label>Tipo *</label>
                  <select [(ngModel)]="nuevoBeneficio.tipo" name="tipo" required>
                    <option value="">Seleccionar...</option>
                    <option value="Salud">Salud</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Alimentación">Alimentación</option>
                    <option value="Desarrollo">Desarrollo</option>
                    <option value="Prestacional">Prestacional</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Descripción</label>
                  <input type="text" [(ngModel)]="nuevoBeneficio.descripcion" name="descripcion">
                </div>
                <div class="form-group">
                  <label>Cobertura</label>
                  <input type="text" [(ngModel)]="nuevoBeneficio.cobertura" name="cobertura" placeholder="Ej: Todos los empleados">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Valor Mensual *</label>
                  <input type="number" [(ngModel)]="nuevoBeneficio.valorMensual" name="valorMensual" required>
                </div>
                <div class="form-group">
                  <label>Estado</label>
                  <select [(ngModel)]="nuevoBeneficio.estado" name="estado">
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="INACTIVO">INACTIVO</option>
                  </select>
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-cancelar" (click)="cerrarModal()">Cancelar</button>
                <button type="submit" class="btn-guardar">Guardar Beneficio</button>
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
export class BeneficiosComponent implements OnInit {
  beneficios: Beneficio[] = [];
  beneficiosFiltrados: Beneficio[] = [];
  busqueda: string = '';
  mostrarModal: boolean = false;
  
  nuevoBeneficio: Beneficio = {
    nombre: '',
    descripcion: '',
    tipo: '',
    cobertura: '',
    valorMensual: 0,
    estado: 'ACTIVO'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarBeneficios();
  }

  cargarBeneficios() {
    this.http.get<Beneficio[]>('/api/beneficios').subscribe({
      next: (data) => {
        this.beneficios = data;
        this.beneficiosFiltrados = data;
      },
      error: (err) => console.error('Error cargando beneficios:', err)
    });
  }

  filtrarBeneficios() {
    const busquedaLower = this.busqueda.toLowerCase();
    this.beneficiosFiltrados = this.beneficios.filter(ben =>
      ben.nombre.toLowerCase().includes(busquedaLower) ||
      ben.tipo?.toLowerCase().includes(busquedaLower)
    );
  }

  getBeneficiosActivos(): number {
    return this.beneficios.filter(b => b.estado === 'ACTIVO').length;
  }

  getInversionTotal(): number {
    return this.beneficios.reduce((sum, ben) => sum + (ben.valorMensual || 0) * 12, 0);
  }

  abrirModal() {
    this.nuevoBeneficio = {
      nombre: '',
      descripcion: '',
      tipo: '',
      cobertura: '',
      valorMensual: 0,
      estado: 'ACTIVO'
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarBeneficio() {
    this.http.post<Beneficio>('/api/beneficios', this.nuevoBeneficio).subscribe({
      next: (beneficioGuardado) => {
        this.beneficios.push(beneficioGuardado);
        this.filtrarBeneficios();
        this.cerrarModal();
        alert('Beneficio guardado exitosamente!');
      },
      error: (err) => {
        console.error('Error guardando beneficio:', err);
        alert('Error al guardar beneficio');
      }
    });
  }

  eliminarBeneficio(id: number) {
    if (confirm('¿Estás seguro de eliminar este beneficio?')) {
      this.http.delete(`/api/beneficios/${id}`).subscribe({
        next: () => {
          this.beneficios = this.beneficios.filter(b => b.id !== id);
          this.filtrarBeneficios();
          alert('Beneficio eliminado');
        },
        error: (err) => {
          console.error('Error eliminando beneficio:', err);
          alert('Error al eliminar beneficio');
        }
      });
    }
  }
}
