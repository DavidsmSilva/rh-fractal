import { Component } from '@angular/core';

@Component({
  selector: 'vacaciones-page',
  standalone: true,
  template: `
    <h2>Vacaciones</h2>
    <div>
      <button (click)="loadVacaciones()">Cargar Vacaciones</button>
      <ul>
        <li *ngFor="let vacacion of vacaciones">
          {{vacacion.empleadoId}} - {{vacacion.fechaInicio | date}} - {{vacacion.fechaFin | date}}
        </li>
      </ul>
    </div>
  `,
  styles: [
    `<h2> { color: #333; }
     button { padding: 8px 16px; background: #007bff; color: white; border: none; cursor: pointer; }
     button:hover { background: #0056b3; }`
  ]
})
export class VacacionesPage {
  vacaciones: any[] = [];

  constructor(private http: HttpClient) {}

  loadVacaciones() {
    this.http.get('http://localhost:8080/api/vacaciones')
      .subscribe(
        (data: any[]) => {
          this.vacaciones = data;
        },
        (error) =u003e {
          console.error('Error loading vacaciones', error);
        }
      );
  }
}