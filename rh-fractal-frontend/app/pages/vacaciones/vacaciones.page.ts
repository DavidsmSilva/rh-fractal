import { Component } from '@angular/core';
import { VacacionesComponent } from '../../../src/app/pages/vacaciones/vacaciones.component';

@Component({
  selector: 'app-vacaciones-page',
  standalone: true,
  imports: [VacacionesComponent],
  template: `<app-vacaciones></app-vacaciones>`
})
export class VacacionesPage {}
