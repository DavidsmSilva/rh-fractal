import { Component } from '@angular/core';
import { ReclutamientoComponent } from './reclutamiento.component';

@Component({
  selector: 'app-reclutamiento-page',
  standalone: true,
  imports: [ReclutamientoComponent],
  template: `<app-reclutamiento></app-reclutamiento>`
})
export class ReclutamientoPage {}
