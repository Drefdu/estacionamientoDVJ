import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  turno: String = '';
  constructor(private database: DatabaseService,private alertController: AlertController, private router: Router,) { }

  ngOnInit() {
  }

  async registro(correo: any, password: any, nombre: any){
    if (correo.value == '' || password.value == '' || nombre.value == '' || this.turno == '') {
      this.presentAlertUno();
    }else{
      console.log('procesando...');
      (await this.database.addUsuario({
        email: correo.value,
        password: password.value,
        nombre: nombre.value,
        turno: this.turno
      })).subscribe((data) => {
        console.log("Registro exitoso");
        this.router.navigate(['/signin']);
      }, (error) => {
        this.presentAlertDos()
        console.log("Algo ha salido mal");
      })
    }
  }

  async presentAlertUno() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: '',
      message: 'Por favor llena todos los campos :(',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
  async presentAlertDos() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Algo a salido mal',
      message: 'Intentalo mas tarde, cambia los datos o recarga la página :(',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
