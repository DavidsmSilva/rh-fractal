import { Routes } from '@angular/router';
import { EmpleadosComponent } from '../pages/empleados/empleados.component';
import { DepartamentosComponent } from '../pages/departamentos/departamentos.component';
import { NominasComponent } from '../pages/nominas/nominas.component';
import { BeneficiosComponent } from '../pages/beneficios/beneficios.component';
import { VacacionesComponent } from '../pages/vacaciones/vacaciones.component';
import { InventarioComponent } from '../pages/inventario/inventario.component';
import { EmpleadosDetailComponent } from '../pages/empleados/empleados-detail/empleados-detail.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'empleados' },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'empleados/:id', component: EmpleadosDetailComponent },
  { path: 'departamentos', component: DepartamentosComponent },
  { path: 'nominas', component: NominasComponent },
  { path: 'beneficios', component: BeneficiosComponent },
  { path: 'vacaciones', component: VacacionesComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: '**', component: EmpleadosComponent }
];
