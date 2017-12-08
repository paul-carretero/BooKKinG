import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Globals } from '../globals';


@Injectable()
export class AchatService {

  urlAchat = `http://`+Globals.host+`/BooKKinG-Server-web/Command` ;
  


  constructor(private http :Http) { }


  public enregistrerCommande() : Observable<any>{
    console.log("dans enregistrement commande");
    let reponse =  this.http.post(this.urlAchat, "" ,{withCredentials: true})
    .map(res => res.json());
    return reponse;
  }

}