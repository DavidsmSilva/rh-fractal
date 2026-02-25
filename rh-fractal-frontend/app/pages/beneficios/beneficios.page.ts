import { Component } from '@angular/core';
import { BeneficiosComponent } from '../../../src/app/pages/beneficios/beneficios.component';

@Component({
  selector: 'app-beneficios-page',
  standalone: true,
  imports: [BeneficiosComponent],
  template: `<app-beneficios></app-beneficios>`
})
export class BeneficiosPage {}
