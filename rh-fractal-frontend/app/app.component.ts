import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div style="padding: 20px;">
      <h1>Fractal Estrategias Sostenibles - RH</h1>
      <p>Sistema de Gestión de Recursos Humanos</p>
      <nav>
        <a routerLink="/empleados" routerLinkActive="active">Empleados</a> |
        <a routerLink="/departamentos" routerLinkActive="active">Departamentos</a> |
        <a routerLink="/nominas" routerLinkActive="active">Nóminas</a> |
        <a routerLink="/beneficios" routerLinkActive="active">Beneficios</a> |
        <a routerLink="/vacaciones" routerLinkActive="active">Vacaciones</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `a { margin: 0 10px; text-decoration: none; }
      a.active { font-weight: bold; color: #007bff; }`
  ]
})
export class AppComponent {
  title = 'Fractal RH';
}
