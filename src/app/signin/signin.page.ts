import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LogeadoService } from '../services/logeado.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(
    private database: DatabaseService, 
    private alertController: AlertController,
    private router: Router,
    private logeado: LogeadoService,
    private cookieService: CookieService) { }

  ngOnInit() {
  }

  async login(correo: any, password: any){    
    (await this.database.loginUsuario({email: correo.value, password: password.value})).subscribe((data)=>{
      let result: any = data;
      if (result.msg) {
        this.presentAlert();
      }else{
        // this.logeado.isLogged = true;
        // this.logeado.userData = data;
        this.cookieService.set('logeado', 'true', 1, '/');
        this.cookieService.set('user', result._id, 1, '/');
        this.router.navigate(['/home']);
      }

    }, (error) => {
      console.log(error);
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Algo ha salido mal :(',
      message: 'Correo o contraseña incorrectos',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
