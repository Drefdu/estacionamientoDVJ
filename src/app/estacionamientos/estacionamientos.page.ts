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
  cantidadTotal = 0;
  cantidadFavoritos = 0;
  cantidadDiscapacitados = 0;
  cantidadLibres = 0;
  cantidadOcupados = 0;
  sec = '';


  constructor(
    public popoverController: PopoverController, 
    private database: DatabaseService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.getEstacionamientos();
    setInterval(() => {
      this.getEstacionamientos();
      console.log("actualizando");
      this.cdr.detectChanges();
    }, 6000);
  }

  async getEstacionamientos(){
    (await this.database.getEstacionamiento()).subscribe((data) => {
      this.puestos = data;
      this.filtrarSeccionPor();
      this.cdr.detectChanges();
    }, (error) => {
      console.log(error);
    });
    this.cdr.detectChanges();
  }

  filtrarSeccion(event: any) {
    this.sec = event.detail.value;
    this.seccion = this.puestos.filter((puesto: any) =>  puesto.seccion == this.sec && puesto.estacionamiento == "H");
    this.cantidadTotal = this.seccion.length;
    this.filtrarLibres();
    this.filtrarOcupados();
    this.filtrarFavoritos();
    this.cdr.detectChanges();
    console.log("filtrado");
  }
  filtrarSeccionPor() {
    this.seccion = this.puestos.filter((puesto: any) =>  puesto.seccion == this.sec && puesto.estacionamiento == "H");
    console.log(this.seccion);
    this.cantidadTotal = this.seccion.length;
    this.filtrarLibres();
    this.filtrarOcupados();
    this.filtrarFavoritos();
    this.cdr.detectChanges();
    console.log("filtrado");
  }



  filtrarLibres(){
    this.libres = this.seccion.filter((puesto: any) => puesto.estado == 'Desocupado' && puesto.favorito == false);
    this.cantidadLibres = this.libres.length;
    this.cdr.detectChanges();
  }

  filtrarOcupados(){
    this.ocupados = this.seccion.filter((puesto: any) => puesto.estado == 'Ocupado' && puesto.favorito == false);
    this.cantidadOcupados = this.ocupados.length;
    console.log(this.ocupados);
    this.cdr.detectChanges();
  }

  filtrarFavoritos(){
    this.favoritos = this.puestos.filter((puesto: any) => puesto.favorito == true);
    this.cantidadFavoritos = this.favoritos.length;
    this.cdr.detectChanges();
  }

  filtrarDiscapacitados(){
    this.discapacitados = this.puestos.filter((puesto: any) => puesto.discapacitado == true);
    this.cantidadDiscapacitados = this.discapacitados.length;
    this.cdr.detectChanges();
  }

  async addFavoritos(id: String, favorito: Boolean){
    let copia = [...this.puestos];
    let index = copia.findIndex((puesto: any) => puesto._id === id);
    copia[index].favorito = !favorito;
    console.log(copia[index], index);
    this.filtrarLibres();
    this.filtrarOcupados();
    this.filtrarFavoritos();
    this.cdr.detectChanges();
    (await this.database.updateEstacionamieno({favorito: copia[index].favorito}, copia[index]._id)).subscribe((data) => {

    }, (error) => {
      console.log(error);
    });
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
