import { article } from './../component/panier/panier.component';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Livre } from '../model/livre';
import { Globals } from '../globals';

@Injectable()
export class PanierService {
  urlPanier= `http://`+Globals.host+`/BooKKinG-Server-web/Cart` ;


  constructor(private http : Http) { }



  public recupererPanier() : Observable<ResponsePanier> {
    console.log("dans recuperer panier");
    let panier = this.http.get(this.urlPanier, {withCredentials: true})
    .map(res => res.json()); 
    return panier;

  }

  public enregistrerPanierEntier(contenuPanier : article[]) : Observable<ResponsePanier> {
    console.log("dans enregistrer panier entier");
    let enregistrementPanier = this.simplePanier(contenuPanier);
    let panier = this.http.post(this.urlPanier, enregistrementPanier, {withCredentials: true})
    .map(res => res.json()); 
    return panier;

  }

  public miseAJourQuantiteLivre(article : SimpleArticle) : Observable<ResponsePanier>{
    console.log("dans mise a jour d'une quantité d'un livre du panier");
    let enregistrementPanier : Item = new Item();
    enregistrementPanier.item = [article];
    let panier = this.http.put(this.urlPanier, enregistrementPanier, {withCredentials: true})
    .map(res => res.json()); 
    return panier;
  }


  public simplePanier(contenuPanier : article[]) : Item {
    let panier : Item = new Item();
    let i = 0;
    contenuPanier.forEach(
      article =>{
        panier.item[i] = new SimpleArticle();
        panier.item[i].idBook = article.idBook;
        panier.item[i].quantity = article.quantity;
        i++;
      }
    );
    return panier;
  }

  
}


export class SimpleArticle{
  idBook : number;
  quantity : number;
}

export class Item{
  item : SimpleArticle[];

  constructor(){
    this.item = [];
  }
}

export class ResponsePanier {
  contenuPanier : article[];
  success : boolean;
  message : string;
}