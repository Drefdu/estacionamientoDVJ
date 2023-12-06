import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstacionamientojPageRoutingModule } from './estacionamientoj-routing.module';

import { EstacionamientojPage } from './estacionamientoj.page';
import { ComponentesModule } from '../modules/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstacionamientojPageRoutingModule,
    ComponentesModule
  ],
  declarations: [EstacionamientojPage]
})
export class EstacionamientojPageModule {}
