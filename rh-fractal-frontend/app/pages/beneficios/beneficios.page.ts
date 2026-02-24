import { Component } from '@angular/core';

@Component({
  selector: 'beneficios-page',
  standalone: true,
  template: `
    <h2>Beneficios</h2>
    <div>
      <button (click)="loadBeneficios()">Cargar Beneficios</button>
      <ul>
        <li *ngFor="let beneficio of beneficios">
          {{beneficio.empleadoId}} - {{beneficio.tipo}} - {{beneficio.monto | currency}}
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
export class BeneficiosPage {
  beneficios: any[] = [];

  constructor(private http: HttpClient) {}

  loadBeneficios() {
    this.http.get('http://localhost:8080/api/beneficios')
      .subscribe(
        (data: any[]) => {
          this.beneficios = data;
        },
        (error) =u003e {
          console.error('Error loading beneficios', error);
        }
      );
  }
}