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
import { NotifService } from './notif.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class RechercheService {

  private readonly urlLivre = Globals.host + `/Book`;

  private currentLivreList: ReponseRecherche;

  private currentRecherche: Recherche;

  private searchSub: Subscription;

  constructor(private http: Http, private navService: NavigationService,
    private cache: LRUCacheService, private notifService: NotifService) {
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

  private isEmpty(): boolean {
    return (this.currentRecherche.anySearch == null || this.currentRecherche.anySearch === '')
      && (this.currentRecherche.type == null || this.currentRecherche.type === 'ANY')
      && (this.currentRecherche.genre == null || this.currentRecherche.genre === 'ANY');
  }

  private newRechercheFromNavData(navData: NavigationData): void {
    if (navData.other === Globals.RECHERCHE && navData.livre == null) {
      this.currentRecherche.page = Number(navData.nPage.toFixed(0)); // force reference update
      if (this.currentRecherche.page == null
        || this.currentRecherche.type !== navData.type
        || this.currentRecherche.genre !== navData.genre) {
        this.currentRecherche.page = 1;
      }
      this.currentRecherche.anySearch = navData.search;
      this.currentRecherche.type = navData.type;
      this.currentRecherche.genre = navData.genre;
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

  private refresh(): void {
    if (!this.isEmpty()) {
      if (this.searchSub != null) {
        this.searchSub.unsubscribe();
      }
      if (this.cache.includes(this.currentRecherche)) {
        this.currentLivreList = this.cache.get(this.currentRecherche);
      } else {
        this.notifService.publish('SEARCH');
        this.currentLivreList = new ReponseRecherche();
        this.searchSub = this.rechercherEnsembleLivre(this.currentRecherche).subscribe(
          reponse => {
            if (reponse.success) {
              this.currentLivreList = reponse;
              this.cache.put(this.currentRecherche, this.currentLivreList);
              this.notifService.publish();
            } else {
              console.log(reponse.message);
            }
          }
        );
      }
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

  /**
   * redéfini le prix minimum de la recherche et lance la recherche
   * @param val le nouveau prix maximum
  */
  public setMinPrice(val: number): void {
    this.currentRecherche.page = 1;
    this.currentRecherche.minPrice = val;
    this.refresh();
  }

  /**
   * redéfini la page courrante
   * @param iPage le numéro de la page
  */
  public setCurrentPage(iPage: number): void {
    this.currentRecherche.page = iPage;
    this.refresh();
  }

  /**
   * récupérer la page disponible
   * @param :rien
   * @return : retourne le numéro de la page de type number
  */
  public getAvailablePages(): number {
    return this.currentLivreList.pagesAvailable;
  }

  public getAvailableResults(): number {
    return this.currentLivreList.resultsAvailable;
  }

  /**
   * récupérer la liste des livres
   * @param :rien
   * @return : liste de livres (un tableau de type Livre)
  */
  public getLastLivreList(): Livre[] {
    return this.currentLivreList.books;
  }

  /**
   * récupérer la page courrante
   * @param :rien
   * @return : le numéro de la page
  */
  public getCurrentPage(): number {
    return this.currentRecherche.page || 1;
  }
}
