import { Injectable } from '@angular/core';
import { Livre } from '../model/livre';
import { CookieService } from 'ngx-cookie-service';
import { NavigationData } from '../model/navigation-data';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavigationService {

  private current = new NavigationData();

  private navEvent: Subject<NavigationData>;

  constructor(private cookieService: CookieService) {
    this.initFromCookie();
    this.navEvent = new Subject();
  }

  public suscribeForNavEvent(): Observable<NavigationData> {
    return this.navEvent.asObservable();
  }

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

  public getCurrentType(): string {
    return this.current.type;
  }

  public getCurrentGenre(): string {
    return this.current.genre;
  }

  public getCurrentLivreTitle(): string {
    return this.current.livre.title;
  }

  public getCurrentOther(): string {
    return this.current.other;
  }

  public setCurrentType(newType: string): void {
    this.reset();
    this.current.type = newType;
    this.defNewNavData();
  }

  public setCurrentGenre(newGenre: string): void {
    this.current.livre = null;
    this.current.search = null;
    this.current.other = null;
    this.current.genre = newGenre;
    this.defNewNavData();
  }

  public setCurrentOther(newOther: string): void {
    this.reset();
    this.current.other = newOther;
    this.defNewNavData();
  }

  public setFromLivre(newLivre: Livre): void {
    this.reset();
    this.current.type = newLivre.type;
    this.current.genre = newLivre.genre;
    this.current.other = newLivre.title;
    this.defNewNavData();
  }
}
