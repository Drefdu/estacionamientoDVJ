import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartingPageRoutingModule } from './starting-routing.module';

import { StartingPage } from './starting.page';
import { HomePageModule } from '../home/home.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartingPageRoutingModule,
    HomePageModule,
  ],
  declarations: [StartingPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class StartingPageModule {}
