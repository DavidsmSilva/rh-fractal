import { Component } from '@angular/core';
import { InventarioComponent } from '../../../src/app/pages/inventario/inventario.component';

@Component({
  selector: 'app-inventario-page',
  standalone: true,
  imports: [InventarioComponent],
  template: `<app-inventario></app-inventario>`
})
export class InventarioPage {}
