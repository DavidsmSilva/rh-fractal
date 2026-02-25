import { Component } from '@angular/core';
import { NominasComponent } from '../../../src/app/pages/nominas/nominas.component';

@Component({
  selector: 'app-nominas-page',
  standalone: true,
  imports: [NominasComponent],
  template: `<app-nominas></app-nominas>`
})
export class NominasPage {}
