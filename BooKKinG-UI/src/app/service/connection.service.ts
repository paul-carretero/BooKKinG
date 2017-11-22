import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Client } from '../model/client';

/**
 * Service dédié à la connection d'un utilisateur
 */
@Injectable()
export class ConnectionService {
   urlConnection = `http://bookking.ovh/BooKKinG-Server-web/Login` ;
  // urlConnection = `http://192.168.1.39:8080/BooKKinG-Server-web/Login` ;
  

  urlUser = `http://bookking.ovh/BooKKinG-Server-web/User` ;
  //urlUser = `http://192.168.1.39:8080/BooKKinG-Server-web/User` ;
  

  /**
   * Construteur pour le service de connection
   * @param http permet de faire le lien avec des pages http (des servlets)
   */
  constructor(private http :Http) { }



  /**
   * Fonction permettant de réaliser la connection d'un client.
   * Retourne le client enregistré dans la base de donnée (au format JSON)
   * @param client informations sur le client qui demande à être connecté
   */
  public connection(client : Client) : Observable<any>{

    console.log("dans envoi connection service");    
/*
    // ancienne méthode pour passer les informations en dur pour réaliser des tests    
    let client = {name:'', address:'', email : 'paul@carretero.ovh', password:'123456'};
*/

/*
    // demande de connection sur le port du servlet correspondant dans la partie backend
    // on map le résultat obtenu pour le récupérer sous un format JSON
    // on récupère toutes les informations liées au compte client
    // Comment récupérer et traiter le fait que l'utilisateur n'est pas encore enregistré et qu'il doivent s'inscire ?
    let connect = this.http.post(`http://192.168.43.58:8080/BooKKinG-Server-web/Login`, client)
    .map(res => res.json());
*/  
//    let connect = this.http.get(this.urlConnection)


    let connect = this.http.put(this.urlConnection, client, {withCredentials: true})
    .map(res => res.json()); 

    // on retourne le client récupéré (Format JSON)
    return connect;
    
  }

  public recuperationInformationsClient() : Observable<Client>{
    console.log("dans envoi récupération d'informations sur un client service");    
    
        let client = this.http.get(this.urlUser, {withCredentials: true})
        .map(res => res.json()); 
    
        // on retourne le client récupéré (Format JSON)
        return client;
        

  }


  public creationUser(client : Client) :  Observable<any> {
    console.log("dans création d'un client service");    
    let connect = this.http.post(this.urlUser, client, {withCredentials: true})
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