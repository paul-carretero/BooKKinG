import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Livre } from '../model/livre';
import { Globals } from '../globals';
import { ResponsePanier } from '../model/response-panier';
import { SimpleArticle } from '../model/simple-article';
import { Item } from '../model/item';
import { Article } from '../model/article';

@Injectable()
export class PanierService {
  urlPanier = `http://` + Globals.host + `/BooKKinG-Server-web/Cart`;

  constructor(private http: Http) { }

  public recupererPanier(): Observable<ResponsePanier> {
    console.log('dans recuperer panier');
    const panier = this.http.get(this.urlPanier, { withCredentials: true })
      .map(res => res.json());
    return panier;

  }

  public enregistrerPanierEntier(contenuPanier: Article[]): Observable<ResponsePanier> {
    console.log('dans enregistrer panier entier');
    const enregistrementPanier = this.simplePanier(contenuPanier);
    const panier = this.http.post(this.urlPanier, enregistrementPanier, { withCredentials: true })
      .map(res => res.json());
    return panier;

  }

  public miseAJourQuantiteLivre(updatedArticle: SimpleArticle): Observable<ResponsePanier> {
    console.log('dans mise a jour d\'une quantité d\'un livre du panier');
    const panier = this.http.put(this.urlPanier, updatedArticle, { withCredentials: true })
      .map(res => res.json());
    return panier;
  }


  public viderPanier(): Observable<ResponsePanier> {
    console.log('dans vider panier');
    const panier = this.http.delete(this.urlPanier, { withCredentials: true })
      .map(res => res.json());
    return panier;
  }

  public simplePanier(contenuPanier: Article[]): Item {
    const panier: Item = new Item();
    console.log('dans la mise en forme du contenu du panier');
    let i = 0;
    contenuPanier.forEach(
      article => {
        panier.items[i] = new SimpleArticle();
        panier.items[i].idBook = article.idBook;
        panier.items[i].quantity = article.quantity;
        console.log('id ajouté  : ' + panier.items[i].idBook);
        console.log('qte ajouté  : ' + panier.items[i].quantity);
        i++;
      }
    );
    return panier;
  }


}
