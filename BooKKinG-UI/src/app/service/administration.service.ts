import { Livre } from './../model/livre';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';
import { Reponse } from '../model/reponse';

@Injectable()
export class AdministrationService {

  private readonly urlLivre = `http://` + Globals.host + `/BooKKinG-Server-web/Book`;

  constructor(private http: Http) { }

  public ajouterLivre(livre: Livre): Observable<Reponse> {
    console.log('dans ajouter un livre');
    console.log('livre à ajouter : ' + livre.title);
    const reponse = this.http.post(this.urlLivre, livre, { withCredentials: true })
      .map(res => res.json());
    return reponse;
  }

}
