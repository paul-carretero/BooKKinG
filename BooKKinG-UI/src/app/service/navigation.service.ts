import { Injectable } from '@angular/core';
import { Livre } from '../model/livre';
import { CookieService } from 'ngx-cookie-service';
import { NavigationData } from '../model/navigation-data';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';

@Injectable()
export class NavigationService {

  private current = new NavigationData();

  private readonly navEvent: Subject<NavigationData>;

  constructor(private cookieService: CookieService) {
    this.initFromCookie();
    this.navEvent = new Subject<NavigationData>();
  }


  public suscribeForNavEvent(): Observable<NavigationData> {
    return this.navEvent.asObservable();
  }

  /**
   * Fonction permettant de récupérer la Navgation courrante
   * @param :rien 
   * @return : retourne la Navgation courrante de type NavigationData
  */
  public getCurrentNavData(): NavigationData {
    return this.current;
  }

  // private methods

  private defNewNavData(): void {
    this.cookieService.set('nav-data', JSON.stringify(this.current));
    this.navEvent.next(this.current);
  }

  private initFromCookie(): void {
    if (this.cookieService.get('nav-data') != null && this.cookieService.get('nav-data') !== '') {
      this.current = JSON.parse(this.cookieService.get('nav-data'));
    }
  }

  private reset(): void {
    this.current = new NavigationData();
  }

  // public Itf

  /**
   * Fonction permettant de récupérer l'attribut type du NavData
   * @param : rien
   * @return : le type (string)
  */
  public getCurrentType(): string {
    return this.current.type;
  }

  /**
   * Fonction permettant de récupérer l'attribut genre du NavData
   * @param : rien
   * @return : le genre (string)
  */
  public getCurrentGenre(): string {
    return this.current.genre;
  }

  /**
   * Fonction permettant de récupérer le titre du livre du NavData
   * @param : rien
   * @return : le titre du livre de type string
  */
  public getCurrentLivreTitle(): string {
    return this.current.livre.title;
  }

  public getCurrentOther(): string {
    return this.current.other;
  }

  /**
   * Fonction permettant de récupérer la page courrante
   * @param :rien 
   * @return : retourne le numéro de la page courrante de type number
  */
  public getCurrentPage(): number {
    return this.current.nPage || 1;
  }

  /**
   * Fonction permettant de redéfinir la type courrant
   * @param newType :  nouveau type à redéfinir (string) 
   * @return : rien
  */
  public setCurrentType(newType: string): void {
    this.reset();
    this.current.type = newType;
    this.current.other = Globals.RECHERCHE;
    this.defNewNavData();
  }

  /**
   * Fonction permettant de redéfinir la genre courrant
   * @param newGenre :  nouveau genre à redéfinir (string) 
   * @return : rien
  */
  public setCurrentGenre(newGenre: string): void {
    this.current.livre = null;
    this.current.other = Globals.RECHERCHE;
    this.current.genre = newGenre;
    this.defNewNavData();
  }

  public setCurrentOther(newOther: string): void {
    this.reset();
    this.current.other = newOther;
    this.defNewNavData();
  }

  /**
   * Fonction permettant de redéfinir la navagation courrante
   * @param newCurrent :  nouvelle navagation à redéfinir (NavigationData) 
   * @return : rien
  */
  public setCurrent(newCurrent: NavigationData) {
    this.current = newCurrent;
    this.defNewNavData();
  }

   /**
   * Fonction permettant de redéfinir les détails de la Navigation (type, genre, livre, other)
   * @param newLivre :  nouveau livre à redéfinir (Livre) 
   * @return : rien
  */
  public setFromLivre(newLivre: Livre): void {
    this.reset();
    this.current.type = newLivre.type;
    this.current.genre = newLivre.genre;
    this.current.other = Globals.LIVRE;
    this.current.livre = newLivre;
    this.defNewNavData();
  }

  /**
   * Fonction permettant de redéfinir la page courrante
   * @param iPage :  numéro de la page à redéfinir (number) 
   * @return : rien
  */
  public setCurrentPage(iPage: number) {
    this.current.nPage = iPage;
    this.defNewNavData();
  }
}
