import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstacionamientoIPageRoutingModule } from './estacionamiento-i-routing.module';

import { EstacionamientoIPage } from './estacionamiento-i.page';
import { ComponentesModule } from '../modules/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstacionamientoIPageRoutingModule,
    ComponentesModule
  ],
  declarations: [EstacionamientoIPage]
})
export class EstacionamientoIPageModule {}
