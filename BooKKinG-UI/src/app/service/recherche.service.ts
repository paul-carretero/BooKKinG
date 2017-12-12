import { Livre } from './../model/livre';
import { ReponseRecherche } from './../model/reponse-recherche';
import { Recherche } from '../model/recherche';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';

@Injectable()
export class RechercheService {

  private urlLivre = `http://` + Globals.host + `/BooKKinG-Server-web/Book`;

  constructor(private http: Http) { }

  public rechercherEnsembleLivre(recherche: Recherche): Observable<ReponseRecherche> {
    return this.http.put(this.urlLivre, recherche, { withCredentials: true }).map(res => res.json());
  }
}
