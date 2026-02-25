import { Component } from '@angular/core';
import { EmpleadosComponent } from '../../../src/app/pages/empleados/empleados.component';

@Component({
  selector: 'app-empleados-page',
  standalone: true,
  imports: [EmpleadosComponent],
  template: `<app-empleados></app-empleados>`
})
export class EmpleadosPage {}
