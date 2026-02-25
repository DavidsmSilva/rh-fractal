import { Component } from '@angular/core';
import { DepartamentosComponent } from '../../../src/app/pages/departamentos/departamentos.component';

@Component({
  selector: 'app-departamentos-page',
  standalone: true,
  imports: [DepartamentosComponent],
  template: `<app-departamentos></app-departamentos>`
})
export class DepartamentosPage {}
