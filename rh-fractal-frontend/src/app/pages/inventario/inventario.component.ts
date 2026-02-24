import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface InventarioEquipo {
  id?: number;
  usuario: string;
  contactoTel: string;
  cargo: string;
  anydesk: string;
  cuentaCorreo: string;
  ubicacion: string;
  serialEquipo: string;
  marca: string;
  modelo: string;
  procesador: string;
  nombreEquipo: string;
  dueno: string;
  licenciaOffice: string;
  windows: string;
  licenciaWindows: string;
  fechaCompra: string;
  valor: number;
  usuarioWindows: string;
  pinWindows: string;
  novedades: string;
}

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="inventario-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="page-title-icon">💻</span>
            Inventario Equipos
          </h1>
          <p class="page-subtitle">Control de equipos tecnológicos de la empresa</p>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon stat-icon-green">💻</div>
          <div class="stat-content">
            <h4>Total Equipos</h4>
            <span class="stat-value">{{ equipos.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-blue">🏷️</div>
          <div class="stat-content">
            <h4>Marcas</h4>
            <span class="stat-value">{{ getMarcas() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-purple">💰</div>
          <div class="stat-content">
            <h4>Valor Total</h4>
            <span class="stat-value">{{ getValorTotal() | currency:'USD':'symbol':'1.0-0' }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-orange">📍</div>
          <div class="stat-content">
            <h4>Ubicaciones</h4>
            <span class="stat-value">{{ getUbicaciones() }}</span>
          </div>
        </div>
      </div>
      
      <div class="search-bar">
        <div class="search-input-wrapper">
          <input type="text" [(ngModel)]="busqueda" (input)="filtrarEquipos()" placeholder="Buscar por usuario, marca, modelo..." />
        </div>
        <button (click)="abrirModal()">+ Nuevo Equipo</button>
      </div>
      
      <div class="empleados-grid">
        <div class="empleado-card" *ngFor="let eq of equiposFiltrados">
          <div class="card-header">
            <h3>{{ eq.usuario }}</h3>
          </div>
          <div class="card-body">
            <p>
              <span class="card-icon">💼</span>
              <span class="card-label">Cargo:</span>
              <span class="card-value">{{ eq.cargo }}</span>
            </p>
            <p>
              <span class="card-icon">🏷️</span>
              <span class="card-label">Marca:</span>
              <span class="card-value">{{ eq.marca }} {{ eq.modelo }}</span>
            </p>
            <p>
              <span class="card-icon">🖥️</span>
              <span class="card-label">Procesador:</span>
              <span class="card-value">{{ eq.procesador }}</span>
            </p>
            <p>
              <span class="card-icon">📍</span>
              <span class="card-label">Ubicación:</span>
              <span class="card-value">{{ eq.ubicacion }}</span>
            </p>
            <p>
              <span class="card-icon">📧</span>
              <span class="card-label">Correo:</span>
              <span class="card-value">{{ eq.cuentaCorreo }}</span>
            </p>
            <p>
              <span class="card-icon">🔑</span>
              <span class="card-label">Usuario Win:</span>
              <span class="card-value">{{ eq.usuarioWindows }}</span>
            </p>
          </div>
          <div class="card-footer">
            <button class="card-action card-action-secondary" (click)="eliminarEquipo(eq.id!)">Eliminar</button>
            <button class="card-action card-action-primary">Ver Detalles</button>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="mostrarModal" (click)="cerrarModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Nuevo Equipo</h2>
            <button class="close-btn" (click)="cerrarModal()">×</button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="guardarEquipo()">
              <div class="form-row">
                <div class="form-group">
                  <label>Usuario *</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.usuario" name="usuario" required>
                </div>
                <div class="form-group">
                  <label>Teléfono Contacto</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.contactoTel" name="contactoTel">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Cargo *</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.cargo" name="cargo" required>
                </div>
                <div class="form-group">
                  <label>Correo</label>
                  <input type="email" [(ngModel)]="nuevoEquipo.cuentaCorreo" name="cuentaCorreo">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Marca *</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.marca" name="marca" required>
                </div>
                <div class="form-group">
                  <label>Modelo *</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.modelo" name="modelo" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Serial Equipo</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.serialEquipo" name="serialEquipo">
                </div>
                <div class="form-group">
                  <label>Procesador</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.procesador" name="procesador">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Ubicación</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.ubicacion" name="ubicacion" placeholder="Ej: Oficina 101">
                </div>
                <div class="form-group">
                  <label>Nombre Equipo</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.nombreEquipo" name="nombreEquipo">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Windows</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.windows" name="windows" placeholder="Ej: Windows 11 Pro">
                </div>
                <div class="form-group">
                  <label>Licencia Windows</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.licenciaWindows" name="licenciaWindows">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Usuario Windows</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.usuarioWindows" name="usuarioWindows">
                </div>
                <div class="form-group">
                  <label>PIN Windows</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.pinWindows" name="pinWindows">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Fecha Compra</label>
                  <input type="date" [(ngModel)]="nuevoEquipo.fechaCompra" name="fechaCompra">
                </div>
                <div class="form-group">
                  <label>Valor</label>
                  <input type="number" [(ngModel)]="nuevoEquipo.valor" name="valor">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Anydesk</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.anydesk" name="anydesk">
                </div>
                <div class="form-group">
                  <label>Licencia Office</label>
                  <input type="text" [(ngModel)]="nuevoEquipo.licenciaOffice" name="licenciaOffice">
                </div>
              </div>
              <div class="form-group">
                <label>Dueno</label>
                <input type="text" [(ngModel)]="nuevoEquipo.dueno" name="dueno">
              </div>
              <div class="form-group">
                <label>Novedades</label>
                <textarea [(ngModel)]="nuevoEquipo.novedades" name="novedades" rows="2"></textarea>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-cancelar" (click)="cerrarModal()">Cancelar</button>
                <button type="submit" class="btn-guardar">Guardar Equipo</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: white; border-radius: 16px; width: 90%; max-width: 700px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    .modal-header { padding: 1.5rem; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; }
    .modal-header h2 { margin: 0; color: #1B4332; font-size: 1.5rem; }
    .close-btn { background: none; border: none; font-size: 2rem; cursor: pointer; color: #666; line-height: 1; }
    .close-btn:hover { color: #1B4332; }
    .modal-body { padding: 1.5rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .form-group { display: flex; flex-direction: column; margin-bottom: 1rem; }
    .form-group label { font-size: 0.85rem; color: #1B4332; margin-bottom: 0.25rem; font-weight: 500; }
    .form-group input, .form-group textarea, .form-group select { padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 0.95rem; transition: border-color 0.3s; }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #2E7D32; }
    .form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .btn-cancelar, .btn-guardar { flex: 1; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; }
    .btn-cancelar { background: #f5f5f5; border: 2px solid #ddd; color: #666; }
    .btn-cancelar:hover { background: #e0e0e0; }
    .btn-guardar { background: linear-gradient(135deg, #2E7D32, #1B5E20); border: none; color: white; }
    .btn-guardar:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(46,125,50,0.3); }
  `]
})
export class InventarioComponent implements OnInit {
  equipos: InventarioEquipo[] = [];
  equiposFiltrados: InventarioEquipo[] = [];
  busqueda: string = '';
  mostrarModal: boolean = false;
  
  nuevoEquipo: InventarioEquipo = {
    usuario: '',
    contactoTel: '',
    cargo: '',
    anydesk: '',
    cuentaCorreo: '',
    ubicacion: '',
    serialEquipo: '',
    marca: '',
    modelo: '',
    procesador: '',
    nombreEquipo: '',
    dueno: '',
    licenciaOffice: '',
    windows: '',
    licenciaWindows: '',
    fechaCompra: '',
    valor: 0,
    usuarioWindows: '',
    pinWindows: '',
    novedades: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarEquipos();
  }

  cargarEquipos() {
    this.http.get<InventarioEquipo[]>('/api/inventario').subscribe({
      next: (data) => {
        this.equipos = data;
        this.equiposFiltrados = data;
      },
      error: (err) => console.error('Error cargando inventario:', err)
    });
  }

  filtrarEquipos() {
    const busquedaLower = this.busqueda.toLowerCase();
    this.equiposFiltrados = this.equipos.filter(eq =>
      eq.usuario?.toLowerCase().includes(busquedaLower) ||
      eq.marca?.toLowerCase().includes(busquedaLower) ||
      eq.modelo?.toLowerCase().includes(busquedaLower) ||
      eq.ubicacion?.toLowerCase().includes(busquedaLower) ||
      eq.cargo?.toLowerCase().includes(busquedaLower)
    );
  }

  getMarcas(): number {
    return new Set(this.equipos.map(eq => eq.marca)).size;
  }

  getUbicaciones(): number {
    return new Set(this.equipos.map(eq => eq.ubicacion)).size;
  }

  getValorTotal(): number {
    return this.equipos.reduce((sum, eq) => sum + (eq.valor || 0), 0);
  }

  abrirModal() {
    this.nuevoEquipo = {
      usuario: '',
      contactoTel: '',
      cargo: '',
      anydesk: '',
      cuentaCorreo: '',
      ubicacion: '',
      serialEquipo: '',
      marca: '',
      modelo: '',
      procesador: '',
      nombreEquipo: '',
      dueno: '',
      licenciaOffice: '',
      windows: '',
      licenciaWindows: '',
      fechaCompra: '',
      valor: 0,
      usuarioWindows: '',
      pinWindows: '',
      novedades: ''
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarEquipo() {
    this.http.post<InventarioEquipo>('/api/inventario', this.nuevoEquipo).subscribe({
      next: (equipoGuardado) => {
        this.equipos.push(equipoGuardado);
        this.filtrarEquipos();
        this.cerrarModal();
        alert('Equipo guardado exitosamente!');
      },
      error: (err) => {
        console.error('Error guardando equipo:', err);
        alert('Error al guardar equipo');
      }
    });
  }

  eliminarEquipo(id: number) {
    if (confirm('¿Estás seguro de eliminar este equipo?')) {
      this.http.delete(`/api/inventario/${id}`).subscribe({
        next: () => {
          this.equipos = this.equipos.filter(e => e.id !== id);
          this.filtrarEquipos();
          alert('Equipo eliminado');
        },
        error: (err) => {
          console.error('Error eliminando equipo:', err);
          alert('Error al eliminar equipo');
        }
      });
    }
  }
}
