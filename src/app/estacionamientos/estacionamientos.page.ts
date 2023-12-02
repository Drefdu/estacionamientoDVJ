import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { DatabaseService } from '../services/database.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-estacionamientos',
  templateUrl: './estacionamientos.page.html',
  styleUrls: ['./estacionamientos.page.scss'],
})
export class EstacionamientosPage implements OnInit {
  @ViewChild('miDiv') miDiv: ElementRef | undefined;

  contenido: string = '¡Hola!';
  opciones: any = {
    op1: 'favoritos',
    op2: 'discapacitados',
    op3: 'ocupados',
    op4: 'libres'
  };
  puestos: any = [];
  seccion: any = [];
  libres: any = [];
  ocupados: any = [];
  favoritos: any = [];
  discapacitados: any = [];


  constructor(
    public popoverController: PopoverController, 
    private database: DatabaseService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.getEstacionamientos();
  }

  async getEstacionamientos(){
    (await this.database.getEstacionamiento()).subscribe((data) => {
      this.puestos = data;
      console.log(this.puestos);
    }, (error) => {
      console.log(error);
    });
  }

  filtrarSeccion(event: any) {
    let seccion = event.detail.value;
    this.seccion = this.puestos.filter((puesto: any) =>  puesto.seccion == seccion);
    this.filtrarLibres();
    this.filtrarOcupados();
    this.filtrarFavoritos();
    this.cdr.detectChanges();
  }

  filtrarLibres(){
    this.libres = this.seccion.filter((puesto: any) => puesto.estado == 'Desocupado' && puesto.favorito == false);
  }

  filtrarOcupados(){
    this.ocupados = this.seccion.filter((puesto: any) => puesto.estado == 'Ocupado' && puesto.favorito == false);
  }

  filtrarFavoritos(){
    this.favoritos = this.seccion.filter((puesto: any) => puesto.favorito == true);
  }

  addFavoritos(id: String, favorito: Boolean){
    let copia = [...this.puestos];
    let index = copia.findIndex((puesto: any) => puesto._id === id);
    copia[index].favorito = !favorito;
    console.log(copia[index], index);
    this.filtrarLibres();
    this.filtrarOcupados();
    this.filtrarFavoritos();
    this.cdr.detectChanges();
  }

  cambiarContenido() {
    if (this.contenido == '¿Qué tal?') {
      this.contenido = 'Hola';
    } else { 
      this.contenido = '¿Qué tal?';
    }
  }

  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: e,
      componentProps: { opciones: this.opciones }
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    this.opciones = data ? data : this.opciones;
  }
}
