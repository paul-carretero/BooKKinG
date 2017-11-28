import { Livre } from './../model/livre';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';


@Injectable()
export class RechercheService {

  urlLivre = `http://`+Globals.host+`/BooKKinG-Server-web/Book` ;
  


  constructor(private http : Http) { }


  public rechercherEnsembleLivre(recherche : Recherche) : Observable<ReponseRecherche>{
    console.log("dans rechercher un ensemble de livre");
    let reponse = this.http.put(this.urlLivre, recherche, {withCredentials: true})
    .map(res => res.json()); 

    // on retourne le client récupéré (Format JSON)
    return reponse;
  }


}

export class Recherche {
  title : string;
  author : string;
  maxPrice : number;
  minPrice : number;
  type : string;
  genres : string[];
}


export class ReponseRecherche {
  books : Livre[];
  success : boolean;
  message : string;
}