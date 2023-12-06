import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstacionamientoIPage } from './estacionamiento-i.page';

const routes: Routes = [
  {
    path: '',
    component: EstacionamientoIPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstacionamientoIPageRoutingModule {}
