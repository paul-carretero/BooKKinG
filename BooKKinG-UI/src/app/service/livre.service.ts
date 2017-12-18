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

  public rechercherLivre(idBook: number): void {
    this.http.get(this.urlLivre + '/' + idBook + '/', Globals.HTTP_OPTIONS).map(res => res.json()).subscribe(
      reponse => {
        if (reponse.success) {
          this.currentLivre = reponse;
          this.navigationService.setFromLivre(this.currentLivre);
        } else {
          console.log(reponse.message);
        }
      }
    );
  }
}
