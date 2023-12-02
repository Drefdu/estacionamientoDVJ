import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient) { }

  estacionamientoURL = "http://localhost:3000/estacionamiento";

  async getEstacionamiento(){
    return await this.http.get(this.estacionamientoURL);
  }
  async updateEstacionamieno(object: any, _id: String){
    return await this.http.put(this.estacionamientoURL + "/" + _id, object);
  }
}
