import { Livre } from './../model/livre';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';
import { LRUCacheService } from './lrucache.service';
import { NavigationService } from './navigation.service';

@Injectable()
export class LivreService {

  private readonly urlLivre = `http://` + Globals.host + `/BooKKinG-Server-web/Book`;

  private currentLivre: Livre;

  private allLivres:Livre[];

  constructor(private http: Http, private cache: LRUCacheService, private navigationService: NavigationService) {
    this.currentLivre = new Livre();
  }

  public getLivre(): Livre {
    return this.currentLivre;
  }

  public updateLivreId(idBook: number): void {
    if (idBook !== this.currentLivre.idBook) {
      const cacheLivre = this.cache.getLivre(idBook);
      if (cacheLivre == null) {
        this.rechercherLivre(idBook);
      } else {
        this.currentLivre = cacheLivre;
        this.navigationService.setFromLivre(this.currentLivre);
      }
    } else {
      this.navigationService.setFromLivre(this.currentLivre);
    }
  }

  public rechercherLivre(idBook: number): Observable<Livre> {
    const conn = this.http.get(this.urlLivre + '/' + idBook + '/', { withCredentials: true }).map(res => res.json());
    conn.subscribe(
      reponse => {
        if (reponse.success) {
          this.currentLivre = reponse;
          this.navigationService.setFromLivre(this.currentLivre);
        } else {
          console.log(reponse.message);
        }
      }
    );
    return conn;
  }


  
  public récupérerAllLivres(): Observable<Livre[]>{
    const conn = this.http.get(this.urlLivre + '/ALL', { withCredentials: true }).map(res => res.json());
    conn.subscribe(
      reponse => {
        if (reponse.success) {          
          this.allLivres = reponse.books;
        } else {
          console.log(reponse.message);
        }
      }
    );
    return conn;
  }

  public getAllLivres() : Livre[]{
    return this.allLivres;
  }

  public ajouterNouveauLivre(livre: Livre): Observable<Livre> {
    livre.idBook = 0;
    const conn = this.http.post(this.urlLivre, livre ,{ withCredentials: true }).map(res => res.json());
    conn.subscribe(
      reponse => {
        if (reponse.success) {
          console.log("retour de ajouter nouveau livre" + JSON.stringify(reponse));
        } else {
          console.log("réponse serveur : " + reponse.message);
        }
      }
    );
    return conn;
  }

  public modifierStockLivre(livre: Livre): Observable<Livre> {
    console.log("livre service modifier stock livre");
    const conn = this.http.post(this.urlLivre, livre ,{ withCredentials: true }).map(res => res.json());
    conn.subscribe(
      reponse => {
        if (reponse.success) {
          console.log("retour de modifier stock nouveau livre" + JSON.stringify(reponse));
        } else {
          console.log("réponse serveur : " + reponse.message);
        }
      }
    );
    return conn;
  }

  public setQuantity(idBook: number, quantity: number) {
    console.log("livre service setQuantity , idBook");
    let i = 0;
    let set = false;

    while (!set && i < this.allLivres.length) {
      if (idBook === this.allLivres[i].idBook) {
        this.allLivres[i].stock = quantity;
        set = true;
        this.modifierStockLivre(this.allLivres[i]);
      }
      i++;
    }
  }

  
  
}
