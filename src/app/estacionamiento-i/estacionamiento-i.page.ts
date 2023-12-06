import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { DatabaseService } from '../services/database.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-estacionamiento-i',
  templateUrl: './estacionamiento-i.page.html',
  styleUrls: ['./estacionamiento-i.page.scss'],
})
export class EstacionamientoIPage implements OnInit {

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



  constructor(
    public popoverController: PopoverController, 
    private database: DatabaseService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.getEstacionamientos();
    setInterval(() => {
      this.getEstacionamientos();
      this.filtrarLibres();
      this.filtrarOcupados();
      this.filtrarFavoritos();
      this.cdr.detectChanges();
    }, 4000);
  }

  async getEstacionamientos(){
    (await this.database.getEstacionamiento()).subscribe((data) => {
      this.puestos = data;
      this.filtrarFavoritos();
      console.log(this.puestos);
    }, (error) => {
      console.log(error);
    });
  }

  filtrarSeccion(event: any) {
    let seccion = event.detail.value;
    this.seccion = this.puestos.filter((puesto: any) =>  puesto.seccion == seccion && puesto.estacionamiento == "I");
    this.cantidadTotal = this.seccion.length;
    this.filtrarLibres();
    this.filtrarOcupados();
    this.filtrarFavoritos();
    this.cdr.detectChanges();
  }

  filtrarLibres(){
    this.libres = this.seccion.filter((puesto: any) => puesto.estado == 'Desocupado' && puesto.favorito == false);
    this.cantidadLibres = this.libres.length;
  }

  filtrarOcupados(){
    this.ocupados = this.seccion.filter((puesto: any) => puesto.estado == 'Ocupado' && puesto.favorito == false);
    this.cantidadOcupados = this.ocupados.length;
  }

  filtrarFavoritos(){
    this.favoritos = this.puestos.filter((puesto: any) => puesto.favorito == true);
    this.cantidadFavoritos = this.favoritos.length;
  }

  filtrarDiscapacitados(){
    this.discapacitados = this.puestos.filter((puesto: any) => puesto.discapacitado == true);
    this.cantidadDiscapacitados = this.discapacitados.length;
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
