import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL= "http://localhost:8080"
  constructor(private http:HttpClient) { }

  getdata(){
    return this.http.get(`${this.URL}/getHi`);
  }
  //Enviando el código fuente al para su análisis
  setdata(json: any){
    return this.http.post(`${this.URL}/setCode`, json)
  }

  //Recibo la consola a mostrar al usuario
  getConsola(){
    return this.http.get(`${this.URL}/getConsola`)
  }
  getAst(){
    return this.http.get(`${this.URL}/getAst`)
  }

  clear(){
    return this.http.get(`${this.URL}/clear`)
  }
}
