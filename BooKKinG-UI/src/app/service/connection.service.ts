import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { Globals } from '../globals';

/**
 * Service dédié à la connection d'un utilisateur
 */
@Injectable()
export class ConnectionService {
  urlConnection = `http://`+Globals.host+`/BooKKinG-Server-web/Login` ;
   
  urlUser = `http://`+Globals.host+`/BooKKinG-Server-web/User` ;
  

  /**
   * Construteur pour le service de connection
   * @param http permet de faire le lien avec des pages http (des servlets)
   */
  constructor(private http :Http) { }





// -------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ Servlet  Login ---------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------

  /**
   * Fonction permettant de réaliser la connection d'un client.
   * Retourne le client enregistré dans la base de donnée (au format JSON)
   * @param client informations sur le client qui demande à être connecté
   */
  public connection(client : Client) : Observable<any>{

    console.log("dans envoi connection service");    

    // demande de connection sur le port du servlet correspondant dans la partie backend
    // on map le résultat obtenu pour le récupérer sous un format JSON

    let connect = this.http.put(this.urlConnection, client, {withCredentials: true})
    .map(res => res.json()); 

    // on retourne le client récupéré (Format JSON)
    return connect;
    
  }

  public deconnexion(): Observable<any> {
    console.log("dans déconnexion");
    let connect = this.http.delete(this.urlConnection, {withCredentials: true}).map(res => res.json());
    return connect;
  }

  public reinitialiserMotDePasse(client: Client): Observable<any> {
    let connect = this.http.post(this.urlConnection, client, {withCredentials: true}).map(res => res.json());
    return connect;
  }


// -------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ Servlet  User ----------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------


  public recuperationInformationsClient(): Observable<Client>{
    console.log("dans envoi récupération d'informations sur un client service");    
    
        let client = this.http.get(this.urlUser, {withCredentials: true})
        .map(res => res.json());
        // on retourne le client récupéré (Format JSON)
        return client;
        

  }

  public creationClient(client: Client):  Observable<any> {
    console.log("dans création d'un client service");    
    let connect = this.http.post(this.urlUser, client, {withCredentials: true})
    .map(res => res.json());

    return connect;
  }

  public modifierClient(client: Client): Observable<any> {
    let connect = this.http.put(this.urlUser, client, {withCredentials: true})
    .map(res => res.json());
    
    return connect;
  }

}


/*
export interface ClientResponse {
    success: boolean;
    client: Client;
  }
*/