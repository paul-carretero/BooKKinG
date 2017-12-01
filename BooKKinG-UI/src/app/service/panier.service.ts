import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Livre } from '../model/livre';
import { Globals } from '../globals';

@Injectable()
export class PanierService {
  urlPanier= `http://`+Globals.host+`/BooKKinG-Server-web/Cart` ;


  constructor(private http : Http) { }



  public recupererPanier() : Observable<Livre[]> {
    console.log("dans recuperer panier");
    let panier = this.http.get(this.urlPanier, {withCredentials: true})
    .map(res => res.json()); 
    return panier;

  }

}
