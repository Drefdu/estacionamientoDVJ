import { Component, OnInit } from '@angular/core';
import { LogeadoService } from '../services/logeado.service';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  selectedOption: string = ''; // Asigna un valor inicial
  turno: string = '';
  user: any = {};
  id = '';

  constructor(private logedo: LogeadoService, private database:DatabaseService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.id = this.cookieService.get('user');
    console.log(this.id);
    this.getUsuario();
  }

  updateForm() {
    // Lógica para actualizar el formulario según la opción seleccionada
  }
  
  async cambiarNombre(nombre:any){
    (await this.database.updateUsuario({nombre: nombre.value}, this.user._id)).subscribe((data)=>{
      console.log('cambio hecho');
      window.location.reload();
    },(error) =>{
      console.log(error);
    });
  }

  async cambiarPassword(newPass: any, confirmPass: any){
    if (newPass.value == confirmPass.value) {
      (await this.database.updateUsuario({password: newPass.value}, this.user._id)).subscribe((data)=>{
        console.log('cambio hecho');
        this.cookieService.delete('user', '/');
        this.cookieService.delete('logeado', '/');
        this.router.navigate(['/signin']);

      },(error) =>{
        console.log(error);
      });
    }
  }

  async cambiarCorreo(email:any){
    (await this.database.updateUsuario({email: email.value}, this.user._id)).subscribe((data)=>{
      console.log('cambio hecho');
      window.location.reload();
    },(error) =>{
      console.log(error);
    });
  }

  async cambiarTurno(){
    (await this.database.updateUsuario({turno: this.turno}, this.user._id)).subscribe((data)=>{
      console.log('cambio hecho');
      window.location.reload();
    },(error) =>{
      console.log(error);
    });
  }

  

  async getUsuario(){
    (await this.database.getUsuario(this.id)).subscribe((data) => {
      let result: any = data;
      this.user = result.usuario;
    }, (error) => {
      console.log(error);
    })
  }

}
