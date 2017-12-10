import { Livre } from './../model/livre';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';

@Injectable()
export class LivreService {

  private urlLivre = `http://` + Globals.host + `/BooKKinG-Server-web/Book` ;

  constructor(private http: Http) { }

  public rechercherLivre(id: number): Observable<Livre> {
    return this.http.get(this.urlLivre + '/' + id + '/', {withCredentials: true}).map(res => res.json());
  }
}
