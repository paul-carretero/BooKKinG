import { Livre } from './../model/livre';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';
import { Init } from '../model/init';

@Injectable()
export class LivreService {

  private urlLivre = `http://` + Globals.host + `/BooKKinG-Server-web/Book`;

  private urlInit = `http://` + Globals.host + `/BooKKinG-Server-web/Init`;

  constructor(private http: Http) { }

  public rechercherLivre(id: number): Observable<Livre> {
    return this.http.get(this.urlLivre + '/' + id + '/', { withCredentials: true }).map(res => res.json());
  }

  public initConstantes(): Observable<Init> {
    return this.http.get(this.urlInit, { withCredentials: true }).map(res => res.json());
  }
}
