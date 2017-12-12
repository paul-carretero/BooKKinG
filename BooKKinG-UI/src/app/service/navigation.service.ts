import { Injectable } from '@angular/core';
import { Livre } from '../model/livre';
import { CookieService } from 'ngx-cookie-service';
import { NavigationData } from '../model/navigation-data';
import { MenuRechercheComponent } from '../component/menu-recherche/menu-recherche.component';
import { Notifiable } from '../itf/notifiable';
import { Subscribable } from '../itf/subscribable';

@Injectable()
export class NavigationService implements Subscribable {

  private current = new NavigationData();

  private toNotify: Notifiable[];

  constructor(private cookieService: CookieService) {
    this.toNotify = [];
    this.initFromCookie();
  }

  // Notification Management

  private notify(): void {
    for (const n of this.toNotify) {
      n.notify();
    }
  }

  public subscribeForNotify(n: Notifiable): void {
    if (!this.toNotify.includes(n)) {
      this.toNotify.push(n);
    }
  }

  public unSubscribe(n: Notifiable): void {
    if (this.toNotify.includes(n)) {
      const index = this.toNotify.indexOf(n);
      this.toNotify.splice(index, 1);
    }
  }

  // private methods

  private backUpNavData(): void {
    this.cookieService.set('nav-data', JSON.stringify(this.current));
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
    if (newType !== 'ANY') {
      this.notify();
    }
    this.backUpNavData();
  }

  public setCurrentGenre(newGenre: string): void {
    this.current.livre = null;
    this.current.search = null;
    this.current.other = null;
    this.current.genre = newGenre;
    this.notify();
    this.backUpNavData();
  }

  public setCurrentOther(newOther: string): void {
    this.reset();
    this.current.other = newOther;
    this.backUpNavData();
  }

  public setFromLivre(newLivre: Livre): void {
    this.reset();
    this.current.type = newLivre.type;
    this.current.genre = newLivre.genre;
    this.current.other = newLivre.title;
    this.backUpNavData();
  }
}
