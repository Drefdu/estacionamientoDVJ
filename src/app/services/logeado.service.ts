import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogeadoService {
  isLogged: Boolean = false;
  userData: any = {}

  constructor() {
    this.isLogged = false;
    this.userData = {};
   }
}
