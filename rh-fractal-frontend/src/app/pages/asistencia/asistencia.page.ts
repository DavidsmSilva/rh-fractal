import { Component } from '@angular/core';
import { AsistenciaComponent } from './asistencia.component';

@Component({
  selector: 'app-asistencia-page',
  standalone: true,
  imports: [AsistenciaComponent],
  template: `<app-asistencia></app-asistencia>`
})
export class AsistenciaPage {}
