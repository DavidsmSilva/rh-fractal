import { Component } from '@angular/core';

@Component({
  selector: 'departamentos-page',
  standalone: true,
  template: `
    <h2>Departamentos</h2>
    <div>
      <button (click)="loadDepartamentos()">Cargar Departamentos</button>
      <ul>
        <li *ngFor="let departamento of departamentos">
          {{departamento.nombre}} - {{departamento.descripcion}}
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
export class DepartamentosPage {
  departamentos: any[] = [];

  constructor(private http: HttpClient) {}

  loadDepartamentos() {
    this.http.get('http://localhost:8080/api/departamentos')
      .subscribe(
        (data: any[]) => {
          this.departamentos = data;
        },
        (error) =u003e {
          console.error('Error loading departamentos', error);
        }
      );
  }
}