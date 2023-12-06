import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstacionamientojPage } from './estacionamientoj.page';

const routes: Routes = [
  {
    path: '',
    component: EstacionamientojPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstacionamientojPageRoutingModule {}
