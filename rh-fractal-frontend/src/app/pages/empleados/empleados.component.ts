import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Empleado {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  numeroEmpleado: string;
  cargo: string;
  departamento: string;
  salario: number;
  estado: string;
  rol: string;
  telefonoContacto?: string;
  fechaContratacion?: string;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="empleados-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="page-title-icon">👥</span>
            Gestión de Empleados
          </h1>
          <p class="page-subtitle">Administra y controla todo el personal de la organización</p>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon stat-icon-green">👥</div>
          <div class="stat-content">
            <h4>Total Empleados</h4>
            <span class="stat-value">{{ empleados.length }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-green">✅</div>
          <div class="stat-content">
            <h4>Activos</h4>
            <span class="stat-value">{{ getEmpleadosActivos() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-purple">⏰</div>
          <div class="stat-content">
            <h4>Inactivos</h4>
            <span class="stat-value">{{ getEmpleadosInactivos() }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-icon-orange">🎯</div>
          <div class="stat-content">
            <h4>Departamentos</h4>
            <span class="stat-value">{{ getDepartamentos() }}</span>
          </div>
        </div>
      </div>
      
      <div class="search-bar">
        <div class="search-input-wrapper">
          <input type="text" [(ngModel)]="busqueda" (input)="filtrarEmpleados()" placeholder="Buscar por nombre, código o correo electrónico..." />
        </div>
        <button (click)="abrirModal()">+ Nuevo Empleado</button>
      </div>
      
      <div class="empleados-grid">
        <div class="empleado-card" *ngFor="let emp of empleadosFiltrados">
          <div class="card-header">
            <h3>{{ emp.nombre }} {{ emp.apellido }}</h3>
          </div>
          <div class="card-body">
            <p>
              <span class="card-icon">🆔</span>
              <span class="card-label">Código:</span>
              <span class="card-value">{{ emp.numeroEmpleado }}</span>
            </p>
            <p>
              <span class="card-icon">📧</span>
              <span class="card-label">Email:</span>
              <span class="card-value">{{ emp.email }}</span>
            </p>
            <p>
              <span class="card-icon">💼</span>
              <span class="card-label">Cargo:</span>
              <span class="card-value">{{ emp.cargo }}</span>
            </p>
            <p>
              <span class="card-icon">🏢</span>
              <span class="card-label">Depto:</span>
              <span class="card-value">{{ emp.departamento }}</span>
            </p>
            <p>
              <span class="card-icon">📅</span>
              <span class="card-label">Ingreso:</span>
              <span class="card-value">{{ emp.fechaContratacion | date:'dd/MM/yyyy' }}</span>
            </p>
            <p>
              <span class="card-icon">📊</span>
              <span class="card-label">Estado:</span>
              <span class="status-badge" [class.status-active]="emp.estado === 'ACTIVO'" [class.status-pending]="emp.estado !== 'ACTIVO'">{{ emp.estado }}</span>
            </p>
          </div>
          <div class="card-footer">
            <button class="card-action card-action-secondary" (click)="eliminarEmpleado(emp.id!)">Eliminar</button>
            <button class="card-action card-action-primary" (click)="verPerfilEmpleado(emp)">Ver Perfil</button>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="mostrarModal" (click)="cerrarModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Nuevo Empleado</h2>
            <button class="close-btn" (click)="cerrarModal()">×</button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="guardarEmpleado()">
              <div class="form-row">
                <div class="form-group">
                  <label>Nombre *</label>
                  <input type="text" [(ngModel)]="nuevoEmpleado.nombre" name="nombre" required>
                </div>
                <div class="form-group">
                  <label>Apellido *</label>
                  <input type="text" [(ngModel)]="nuevoEmpleado.apellido" name="apellido" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Email *</label>
                  <input type="email" [(ngModel)]="nuevoEmpleado.email" name="email" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Cargo *</label>
                  <input type="text" [(ngModel)]="nuevoEmpleado.cargo" name="cargo" required>
                </div>
                <div class="form-group">
                  <label>Rol *</label>
                  <select [(ngModel)]="nuevoEmpleado.rol" name="rol" required>
                    <option value="">Seleccionar...</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Directora">Directora</option>
                    <option value="Coordinador">Coordinador</option>
                    <option value="Analista">Analista</option>
                    <option value="Desarrollador">Desarrollador</option>
                    <option value="Contador">Contador</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Asistente">Asistente</option>
                    <option value="Secretaria">Secretaria</option>
                    <option value="Diseñador">Diseñador</option>
                  </select>
                </div>
              </div>
                  <label>Departamento *</label>
                  <select [(ngModel)]="nuevoEmpleado.departamento" name="departamento" required>
                    <option value="">Seleccionar...</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Mercadeo">Mercadeo</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Operaciones">Operaciones</option>
                    <option value="Administración">Administración</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Salario *</label>
                  <input type="number" [(ngModel)]="nuevoEmpleado.salario" name="salario" required>
                </div>
                <div class="form-group">
                  <label>Teléfono</label>
                  <input type="text" [(ngModel)]="nuevoEmpleado.telefonoContacto" name="telefonoContacto">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Fecha de Contratación *</label>
                  <input type="date" [(ngModel)]="nuevoEmpleado.fechaContratacion" name="fechaContratacion" required>
                </div>
                <div class="form-group">
                  <label>Estado</label>
                  <select [(ngModel)]="nuevoEmpleado.estado" name="estado">
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="INACTIVO">INACTIVO</option>
                    <option value="EN_PRUEBA">EN PRUEBA</option>
                  </select>
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-cancelar" (click)="cerrarModal()">Cancelar</button>
                <button type="submit" class="btn-guardar">Guardar Empleado</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background: white;
      border-radius: 16px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-header h2 {
      margin: 0;
      color: #1B4332;
      font-size: 1.5rem;
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #666;
      line-height: 1;
    }
    .close-btn:hover {
      color: #1B4332;
    }
    .modal-body {
      padding: 1.5rem;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
    }
    .form-group label {
      font-size: 0.85rem;
      color: #1B4332;
      margin-bottom: 0.25rem;
      font-weight: 500;
    }
    .form-group input,
    .form-group select {
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: border-color 0.3s;
    }
    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #2E7D32;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .btn-cancelar, .btn-guardar {
      flex: 1;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-cancelar {
      background: #f5f5f5;
      border: 2px solid #ddd;
      color: #666;
    }
    .btn-cancelar:hover {
      background: #e0e0e0;
    }
    .btn-guardar {
      background: linear-gradient(135deg, #2E7D32, #1B5E20);
      border: none;
      color: white;
    }
    .btn-guardar:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
    }
  `]
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosFiltrados: Empleado[] = [];
  busqueda: string = '';
  mostrarModal: boolean = false;
  
  nuevoEmpleado: Empleado = {
    nombre: '',
    apellido: '',
    email: '',
    numeroEmpleado: '',
    cargo: '',
    departamento: '',
    salario: 0,
    estado: 'ACTIVO',
    rol: '',
    telefonoContacto: '',
    fechaContratacion: new Date().toISOString().split('T')[0]
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.http.get<Empleado[]>('/api/empleados').subscribe({
      next: (data) => {
        this.empleados = data;
        this.empleadosFiltrados = data;
      },
      error: (err) => {
        console.error('Error cargando empleados:', err);
      }
    });
  }

  filtrarEmpleados() {
    const busquedaLower = this.busqueda.toLowerCase();
    this.empleadosFiltrados = this.empleados.filter(emp =>
      emp.nombre.toLowerCase().includes(busquedaLower) ||
      emp.apellido.toLowerCase().includes(busquedaLower) ||
      emp.email.toLowerCase().includes(busquedaLower) ||
      emp.numeroEmpleado.toLowerCase().includes(busquedaLower) ||
      emp.cargo.toLowerCase().includes(busquedaLower)
    );
  }

  getEmpleadosActivos(): number {
    return this.empleados.filter(e => e.estado === 'ACTIVO').length;
  }

  getEmpleadosInactivos(): number {
    return this.empleados.filter(e => e.estado !== 'ACTIVO').length;
  }

  getDepartamentos(): number {
    const deptos = new Set(this.empleados.map(e => e.departamento));
    return deptos.size;
  }

  abrirModal() {
    this.nuevoEmpleado = {
      nombre: '',
      apellido: '',
      email: '',
      numeroEmpleado: '',
      cargo: '',
      departamento: '',
      salario: 0,
      estado: 'ACTIVO',
      rol: '',
      telefonoContacto: '',
      fechaContratacion: new Date().toISOString().split('T')[0]
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarEmpleado() {
    this.http.post<Empleado>('/api/empleados', this.nuevoEmpleado).subscribe({
      next: (empleadoGuardado) => {
        this.empleados.push(empleadoGuardado);
        this.filtrarEmpleados();
        this.cerrarModal();
        alert('Empleado guardado exitosamente!');
      },
      error: (err) => {
        console.error('Error guardando empleado:', err);
        alert('Error al guardar empleado');
      }
    });
  }

  eliminarEmpleado(id: number) {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.http.delete(`/api/empleados/${id}`).subscribe({
        next: () => {
          this.empleados = this.empleados.filter(e => e.id !== id);
          this.filtrarEmpleados();
          alert('Empleado eliminado');
        },
        error: (err) => {
          console.error('Error eliminando empleado:', err);
          alert('Error al eliminar empleado');
        }
      });
    }
  }

  // Nueva: ver perfil de empleado
  verPerfilEmpleado(emp: Empleado) {
    if (!emp || !emp.id) {
      alert('Empleado sin ID');
      return;
    }
    this.router.navigate(['/empleados', emp.id]);
  }
}
