import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstacionamientosPageRoutingModule } from './estacionamientos-routing.module';

import { EstacionamientosPage } from './estacionamientos.page';
import { ComponentesModule } from '../modules/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstacionamientosPageRoutingModule,
    ComponentesModule,
  ],
  declarations: [EstacionamientosPage]
})
export class EstacionamientosPageModule {}
