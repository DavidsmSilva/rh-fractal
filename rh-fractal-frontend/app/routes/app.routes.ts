import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/empleados', pathMatch: 'full' },
  { path: 'empleados', component: EmpleadosPage },
  { path: 'departamentos', component: DepartamentosPage },
  { path: 'nominas', component: NominasPage },
  { path: 'beneficios', component: BeneficiosPage },
  { path: 'vacaciones', component: VacacionesPage },
  { path: '**', component: PageNotFoundComponent }
];

export class PageNotFoundComponent {}