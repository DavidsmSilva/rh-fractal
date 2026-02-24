import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'empleados-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Empleados</h2>
    <div>
      <button (click)="loadEmpleados()">Cargar Empleados</button>
      <ul>
        <li *ngFor="let empleado of empleados">
          {{empleado.nombre}} {{empleado.apellido}} - {{empleado.email}}
        </li>
      </ul>
      <p *ngIf="empleados.length === 0">No hay empleados</p>
    </div>
  `,
  styles: [
    `<h2> { color: #333; }
     button { padding: 8px 16px; background: #007bff; color: white; border: none; cursor: pointer; }
     button:hover { background: #0056b3; }`
  ]
})
export class EmpleadosPage {
  empleados: any[] = [];

  constructor(private http: HttpClient) {
    this.loadEmpleados();
  }

  loadEmpleados() {
    this.http.get<any[]>('http://localhost:8080/api/empleados')
      .subscribe({
        next: (data) => {
          this.empleados = data;
        },
        error: (error) => {
          console.error('Error loading empleados', error);
        }
      });
  }
}