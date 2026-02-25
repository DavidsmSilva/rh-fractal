import { Component } from '@angular/core';
import { ContratosComponent } from './contratos.component';

@Component({
  selector: 'app-contratos-page',
  standalone: true,
  imports: [ContratosComponent],
  template: `<app-contratos></app-contratos>`
})
export class ContratosPage {}
