import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadosPage } from './pages/empleados/empleados.page';
import { DepartamentosPage } from './pages/departamentos/departamentos.page';
import { NominasPage } from './pages/nominas/nominas.page';
import { BeneficiosPage } from './pages/beneficios/beneficios.page';
import { VacacionesPage } from './pages/vacaciones/vacaciones.page';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    EmpleadosPage,
    DepartamentosPage,
    NominasPage,
    BeneficiosPage,
    VacacionesPage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}