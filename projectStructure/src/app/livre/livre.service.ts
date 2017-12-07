import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UrlService } from '../shared/url.service';
import { Livre } from '../model/livre';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LivreService {
  urlLivre = `http://`+UrlService.host+`/BooKKinG-Server-web/Book` ;

  constructor(private http : Http) { }

  public ajouterLivre(livre : Livre) : Observable<Reponse>{
    console.log("dans ajouter un livre");
    console.log("livre à ajouter : " + livre.title);
    let reponse = this.http.post(this.urlLivre, livre, {withCredentials: true})
      .map(res => res.json());
    return reponse;
  }

  public rechercherEnsembleLivre(recherche : Recherche) : Observable<Reponse>{
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


export class Reponse {
  books? : Livre[];
  success : boolean;
  message : string;
}