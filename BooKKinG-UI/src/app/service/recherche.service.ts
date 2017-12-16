import { Livre } from './../model/livre';
import { ReponseRecherche } from './../model/reponse-recherche';
import { Recherche } from '../model/recherche';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';
import { NavigationService } from './navigation.service';
import { NavigationData } from '../model/navigation-data';
import { LRUCacheService } from './lrucache.service';

@Injectable()
export class RechercheService {

  private urlLivre = `http://` + Globals.host + `/BooKKinG-Server-web/Book`;

  private currentLivreList: ReponseRecherche;

  private currentRecherche: Recherche;

  constructor(private http: Http, private navService: NavigationService, private cache: LRUCacheService) {
    this.currentRecherche = new Recherche();
    this.currentLivreList = new ReponseRecherche();
    this.listenForNavUpdate();
    this.newRechercheFromNavData(this.navService.getCurrentNavData());
  }

  // Private Methodes //

  private noChange(newNavData: NavigationData): boolean {
    return this.currentRecherche.anySearch === newNavData.search
      && this.currentRecherche.type === newNavData.type
      && this.currentRecherche.genre === newNavData.genre
      && this.currentRecherche.page === newNavData.nPage;
  }

  private newRechercheFromNavData(navData: NavigationData): void {
    if (navData.other === Globals.RECHERCHE && navData.livre == null) {
      this.currentRecherche.anySearch = navData.search;
      this.currentRecherche.type = navData.type;
      this.currentRecherche.genre = navData.genre;
      this.currentRecherche.page = Number(navData.nPage.toFixed(0)); // force reference update
      if (this.currentRecherche.page == null) {
        this.currentRecherche.page = 1;
      }
      this.refresh();
    }
  }

  private listenForNavUpdate(): void {
    this.navService.suscribeForNavEvent().subscribe(
      navData => {
        if (!this.noChange(navData)) {
          this.currentRecherche.page = 1;
          this.newRechercheFromNavData(navData);
        }
      }
    );
  }

  private rechercherEnsembleLivre(recherche: Recherche): Observable<ReponseRecherche> {
    return this.http.put(this.urlLivre, recherche, { withCredentials: true }).map(res => res.json());
  }

  private refresh() {
    if (this.cache.includes(this.currentRecherche)) {
      this.currentLivreList = this.cache.get(this.currentRecherche);
    } else {
      this.rechercherEnsembleLivre(this.currentRecherche).subscribe(
        reponse => {
          if (reponse.success) {
            this.currentLivreList = reponse;
            this.cache.put(this.currentRecherche, this.currentLivreList);
          } else {
            console.log(reponse.message);
          }
        }
      );
    }
  }

  // Public Interfaces //

  /**
   * redéfini le prix maximum de la recherche et lance la recherche
   * @param val le nouveau prix maximum
   */
  public setMaxPrice(val: number): void {
    this.currentRecherche.page = 1;
    this.currentRecherche.maxPrice = val;
    this.refresh();
  }

  public setMinPrice(val: number): void {
    this.currentRecherche.page = 1;
    this.currentRecherche.minPrice = val;
    this.refresh();
  }

  public setCurrentSearch(newSearch: string): void {
    this.currentRecherche.page = 1;
    this.currentRecherche.anySearch = newSearch;
    if (this.currentRecherche.anySearch.length > 2) {
      this.refresh();
    }
  }

  public setCurrentPage(iPage: number): void {
    this.currentRecherche.page = iPage;
    this.refresh();
    this.navService.setCurrentPage(iPage);
  }

  public getAvailablePages(): number {
    return this.currentLivreList.pagesAvailable;
  }

  public getAvailableResults(): number {
    return this.currentLivreList.resultsAvailable;
  }

  public getLastLivreList(): Livre[] {
    return this.currentLivreList.books;
  }

  public getCurrentPage(): number {
    return this.currentRecherche.page || 1;
  }
}
