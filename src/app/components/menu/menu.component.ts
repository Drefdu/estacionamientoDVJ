import { Component, OnInit } from '@angular/core';
import { LogeadoService } from 'src/app/services/logeado.service';
import { CookieService } from 'ngx-cookie-service';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  user: any = {}
  id = '';
  
  constructor(
    private logeado: LogeadoService, 
    private cookieService: CookieService, 
    private database: DatabaseService,
    private router: Router,) { }

  ngOnInit() {
    this.id = this.cookieService.get('user');
    console.log(this.id);
    this.getUsuario();
  }

  async getUsuario(){
    (await this.database.getUsuario(this.id)).subscribe((data) => {
      let result: any = data;
      this.user = result.usuario;
    }, (error) => {
      console.log(error);
    })
  }

  cerrarSesion(){
    console.log("saliendo");
    this.cookieService.delete('user', '/');
    this.cookieService.delete('logeado', '/');
    this.router.navigate(['/signin']);
  }

}
