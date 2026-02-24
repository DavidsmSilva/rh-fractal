import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empleados-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empleado-detail">
      <h2>Detalle de Empleado</h2>
      <p>ID: {{ id }}</p>
      <!-- Se pueden agregar más datos cargados desde backend con el ID -->
    </div>
  `,
  styles: []
})
export class EmpleadosDetailComponent {
  id: string | null = null;
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
