import { Routes } from '@angular/router';
import { EmpleadosPage } from '../pages/empleados/empleados.page';
import { DepartamentosPage } from '../pages/departamentos/departamentos.page';
import { NominasPage } from '../pages/nominas/nominas.page';
import { BeneficiosPage } from '../pages/beneficios/beneficios.page';
import { VacacionesPage } from '../pages/vacaciones/vacaciones.page';
import { InventarioPage } from '../pages/inventario/inventario.page';
import { ContratosPage } from '../pages/contratos/contratos.page';
import { AsistenciaPage } from '../pages/asistencia/asistencia.page';
import { ReclutamientoPage } from '../pages/reclutamiento/reclutamiento.page';

export const routes: Routes = [
  { path: '', redirectTo: '/empleados', pathMatch: 'full' },
  { path: 'empleados', component: EmpleadosPage },
  { path: 'departamentos', component: DepartamentosPage },
  { path: 'nominas', component: NominasPage },
  { path: 'beneficios', component: BeneficiosPage },
  { path: 'vacaciones', component: VacacionesPage },
  { path: 'inventario', component: InventarioPage },
  { path: 'contratos', component: ContratosPage },
  { path: 'asistencia', component: AsistenciaPage },
  { path: 'reclutamiento', component: ReclutamientoPage },
  { path: '**', component: PageNotFoundComponent }
];

export class PageNotFoundComponent {}
