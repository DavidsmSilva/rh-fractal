import { Component } from '@angular/core';
import { ReclutamientoComponent } from '../../src/app/pages/reclutamiento/reclutamiento.component';

@Component({
  selector: 'app-reclutamiento-page',
  standalone: true,
  imports: [ReclutamientoComponent],
  template: `<app-reclutamiento></app-reclutamiento>`
})
export class ReclutamientoPage {}
