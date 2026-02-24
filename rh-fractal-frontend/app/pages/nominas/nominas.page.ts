import { Component } from '@angular/core';

@Component({
  selector: 'nominas-page',
  standalone: true,
  template: `
    <h2>Nóminas</h2>
    <div>
      <button (click)="loadNominas()">Cargar Nóminas</button>
      <ul>
        <li *ngFor="let nomina of nominas">
          {{nomina.empleadoId}} - {{nomina.fechaPago | date}} - {{nomina.monto | currency}}
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
export class NominasPage {
  nominas: any[] = [];

  constructor(private http: HttpClient) {}

  loadNominas() {
    this.http.get('http://localhost:8080/api/nominas')
      .subscribe(
        (data: any[]) => {
          this.nominas = data;
        },
        (error) =u003e {
          console.error('Error loading nominas', error);
        }
      );
  }
}