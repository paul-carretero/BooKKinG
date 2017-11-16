import { Livre } from './../model/livre';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class PanierService {

  liste : Livre[];

  constructor(private http: Http) { }
  
  
 // public contenuPanier(): Livre[] {
    //public contenuPanier(): Observable<Livre[]> { 
     /* return this.http.get(`http://localhost:8080/livres`)
      .map(res => res.json()._embedded.livres); 
      */
    /*  let liste : Livre[];
      liste = [{id:1, titre:'titre1', auteur:'auteur1', prix:15},
      {id:1, titre:'titre2', auteur:'auteur2', prix:5}
      ];
      return liste;
      */
  //  }


  /*
    public save(todo :Livre): Observable<Livre>{
        console.log("envoi d un post");
        return this.http.post(`http://localhost:8080/livres`, Livre)
        .map(res => res.json()); 
    }
    */
}