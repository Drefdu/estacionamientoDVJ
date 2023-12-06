import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient) { }

  estacionamientoURL = "https://estacionamientodvj.onrender.com/estacionamiento";
  usuarioURL = "https://estacionamientodvj.onrender.com/usuarios";

  async getEstacionamiento(){
    return await this.http.get(this.estacionamientoURL);
  }
  async updateEstacionamieno(object: any, _id: String){
    return await this.http.put(this.estacionamientoURL + "/" + _id, object);
  }
  async getUsuario(id: String){
    return await this.http.get(this.usuarioURL + "/" + id);
  }
  async loginUsuario(object: {}){
    return await this.http.post(this.usuarioURL + '/login', object);
  }
  async updateUsuario(object: {}, id: String){
    return await this.http.put(this.usuarioURL + '/' + id, object);
  }
  async addUsuario(object: {}){
    return await this.http.post(this.usuarioURL, object);
  }
}
