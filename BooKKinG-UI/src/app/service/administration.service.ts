import { Livre } from './../model/livre';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdministrationService {
  urlLivre = `http://bookking.ovh/BooKKinG-Server-web/Book` ;
  

  constructor(private http : Http) { }


  
  public ajouterLivre(livre : Livre) : Observable<Reponse>{
    console.log("dans ajouter un livre");
    console.log("livre à ajouter : " + livre.title);
    let reponse = this.http.post(this.urlLivre, livre, {withCredentials: true})
      .map(res => res.json());
    return reponse;
  }

}

export class Reponse {
  success : boolean;
  message : string;
}