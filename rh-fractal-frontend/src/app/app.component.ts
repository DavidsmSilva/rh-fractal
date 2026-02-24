import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="app-container">
      <header class="header">
        <nav class="navbar">
          <div class="nav-container">
            <a href="#" class="logo">
              <div class="logo-icon">F</div>
              <span>Fractal RH</span>
            </a>
            <ul class="nav-menu">
              <li><a routerLink="/empleados" routerLinkActive="active"><span class="nav-icon">👥</span>Empleados</a></li>
              <li><a routerLink="/departamentos" routerLinkActive="active"><span class="nav-icon">🏢</span>Departamentos</a></li>
              <li><a routerLink="/nominas" routerLinkActive="active"><span class="nav-icon">💳</span>Nóminas</a></li>
              <li><a routerLink="/beneficios" routerLinkActive="active"><span class="nav-icon">🎁</span>Beneficios</a></li>
              <li><a routerLink="/vacaciones" routerLinkActive="active"><span class="nav-icon">🏖️</span>Vacaciones</a></li>
              <li><a routerLink="/inventario" routerLinkActive="active"><span class="nav-icon">💻</span>Inventario</a></li>
            </ul>
          </div>
        </nav>
      </header>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-logo">
            <span>🌱</span> Fractal Estrategias Sostenibles
          </div>
          <div class="footer-text">
            © 2026 Sistema de Recursos Humanos - Todos los derechos reservados
          </div>
          <div class="footer-links">
            <a href="#">Ayuda</a>
            <a href="#">Términos</a>
            <a href="#">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  `
})
export class AppComponent {
  title = 'rh-fractal-frontend';
}
