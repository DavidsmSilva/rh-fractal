import { Component } from '@angular/core';
import { AsistenciaComponent } from '../../../src/app/pages/asistencia/asistencia.component';

@Component({
  selector: 'app-asistencia-page',
  standalone: true,
  imports: [AsistenciaComponent],
  template: `<app-asistencia></app-asistencia>`
})
export class AsistenciaPage {}
