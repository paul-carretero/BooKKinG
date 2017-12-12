import { Livre } from './../model/livre';
import { ReponseRecherche } from './../model/reponse-recherche';
import { Recherche } from '../model/recherche';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';
import { MenuRechercheComponent } from '../component/menu-recherche/menu-recherche.component';
import { Notifiable } from '../itf/notifiable';
import { Subscribable } from '../itf/subscribable';

@Injectable()
export class RechercheService implements Subscribable {

  private urlLivre = `http://` + Globals.host + `/BooKKinG-Server-web/Book`;

  private anySearch = '';

  private min = Globals.initData.min;

  private max = Globals.initData.max;

  private toNotify: Notifiable[];

  constructor(private http: Http) {
    this.toNotify = [];
  }

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

  public getMinPrice(): number {
    return this.min;
  }

  public getMaxPrice(): number {
    return this.max;
  }

  public setMaxPrice(val: number): void {
    this.max = val;
  }

  public setMinPrice(val: number): void {
    this.min = val;
  }

  public getCurrentSearch(): string {
    return this.anySearch;
  }

  public setCurrentSearch(newSearch: string): any {
    this.anySearch = newSearch;
    if (this.anySearch !== '') {
      this.notify();
    }
  }

  public rechercherEnsembleLivre(recherche: Recherche): Observable<ReponseRecherche> {
    return this.http.put(this.urlLivre, recherche, { withCredentials: true }).map(res => res.json());
  }
}
