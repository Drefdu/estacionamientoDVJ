import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private database: DatabaseService, private cdr: ChangeDetectorRef) {
    setInterval(() => {
      this.getEstacionamientos();
      this.filtrarSeccionPor();
    }, 3000);
  }

  ngOnInit(){
    this.getEstacionamientos();
  }

  estacionamientos: any = [];
  estacionamientosFiltrados: any = [];
  estacionamientosOcupados: any = [];
  estacionamientosLibres: any = [];
  estacionamientosFavoritos: any = [];

  NombreEstacionamiento = "A";

  Total = 0;
  Libres = 0;
  Ocupados = 0;

  seccion = '';

  async getEstacionamientos(){
    (await this.database.getEstacionamiento()).subscribe((data) => {
      this.estacionamientos = data;
      this.estacionamientos = this.estacionamientos.filter((estacionamiento: any) => estacionamiento.estacionamiento === "A");
    }, (error) => {
      console.log(error);
    })
  }

  async updateEstacionamientos(_id: String, favorito: Boolean){
    const estacionamientosCopy = [...this.estacionamientos];
    const index = estacionamientosCopy.findIndex(estacionamiento => estacionamiento._id === _id);
    if (index !== -1) {
    estacionamientosCopy[index].favorito = !favorito;
    this.cdr.detectChanges();
    
    (await this.database.updateEstacionamieno({ favorito: estacionamientosCopy[index].favorito }, _id)).subscribe(
      (data) => {
      },
      (error) => {
        console.log(error);
        estacionamientosCopy[index].favorito = favorito;
      }
    );
  }
  }

  filtroSeccionButton(event: any) {
    this.seccion = event.detail.value;
    this.filtrarSeccionPor();
  }

  filtrarSeccionPor(){
    if (this.seccion != '') {
      this.estacionamientosFiltrados = this.estacionamientos.filter((estacionamiento: any) => estacionamiento.seccion === this.seccion);
      this.estacionamientosLibres = this.estacionamientosFiltrados.filter((estacionamiento: any) => estacionamiento.estado === "Desocupado" && estacionamiento.favorito === false);
      this.estacionamientosOcupados = this.estacionamientosFiltrados.filter((estacionamiento: any) => estacionamiento.estado === "Ocupado" && estacionamiento.favorito === false);
      this.estacionamientosFavoritos = this.estacionamientosFiltrados.filter((estacionamiento: any) => estacionamiento.favorito === true);
      this.Total = this.estacionamientosFiltrados.length;
      this.Libres = this.estacionamientosLibres.length;
      this.Ocupados = this.estacionamientosOcupados.length;
      this.cdr.detectChanges();
    } else {
      this.estacionamientosFiltrados = []
      this.cdr.detectChanges();
    }
  }
  
}
