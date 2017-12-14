import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Globals } from '../globals';


@Injectable()
export class AchatService {

  urlAchat = `http://` + Globals.host + `/BooKKinG-Server-web/Command`;

  constructor(private http: Http) { }

  public enregistrerCommande(adresseLivraison : string): Observable<any> {
    console.log('dans enregistrement commande');
    let json = {address:adresseLivraison}; 
    //const reponse = this.http.post(this.urlAchat, '', { withCredentials: true })
    const reponse = this.http.post(this.urlAchat, json, { withCredentials: true })
      .map(res => res.json());
    return reponse;
  }

  public recupererCommandes(): Observable<any> {
    console.log('dans recupérer des commandes');
    const reponse = this.http.get(this.urlAchat, { withCredentials: true })
      .map(res => res.json());
    return reponse;
  }

}
