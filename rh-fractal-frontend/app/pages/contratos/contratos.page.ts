import { Component } from '@angular/core';
import { ContratosComponent } from '../../../src/app/pages/contratos/contratos.component';

@Component({
  selector: 'app-contratos-page',
  standalone: true,
  imports: [ContratosComponent],
  template: `<app-contratos></app-contratos>`
})
export class ContratosPage {}
