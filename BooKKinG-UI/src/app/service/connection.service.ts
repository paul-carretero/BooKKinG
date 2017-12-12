import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { Globals } from '../globals';
import { PanierService } from './panier.service';

/**
 * Service dédié à la connection d'un utilisateur
 */
@Injectable()
export class ConnectionService {

  private urlConnection = `http://` + Globals.host + `/BooKKinG-Server-web/Login`;

  private urlUser = `http://` + Globals.host + `/BooKKinG-Server-web/User`;

  private currentClient: Client = null;

  private isConnected: boolean;

  private panierService: PanierService;

  /**
   * Construteur pour le service de connection
   * @param http permet de faire le lien avec des pages http (des servlets)
   */
  constructor(private http: Http) {
    this.currentClient = new Client();
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  public getCurrentUser(): Client {
    return this.currentClient;
  }

  public panierServiceRegister(panierService: PanierService): void {
    this.panierService = panierService;
  }


  // ------------------------------------------------ Servlet  Login ---------------------------------------------------------

  /**
   * Fonction permettant de réaliser la connection d'un client.
   * Retourne le client enregistré dans la base de donnée (au format JSON)
   * @param client informations sur le client qui demande à être connecté
   */
  public connection(client: Client): Observable<any> {
    const conn = this.http.put(this.urlConnection, client, { withCredentials: true }).map(res => res.json());
    conn.subscribe(
      connected => {
        if (connected.success) {
          this.isConnected = true;
          this.recuperationInformationsClient();
        } else {
          this.isConnected = false;
        }
      }
    );
    return conn;
  }

  public deconnexion(): Observable<any> {
    this.currentClient = new Client();
    this.isConnected = false;
    return this.http.delete(this.urlConnection, { withCredentials: true }).map(res => res.json());
  }

  public reinitialiserMotDePasse(client: Client): Observable<any> {
    return this.http.post(this.urlConnection, client, { withCredentials: true }).map(res => res.json());
  }

  // ------------------------------------------------ Servlet  User ----------------------------------------------------------

  /**
   * on retourne le client récupéré (Format JSON)
   */
  public recuperationInformationsClient(): Observable<Client> {
    const conn: Observable<Client> = this.http.get(this.urlUser, { withCredentials: true }).map(res => res.json());
    // l'utilisateur est connecté
    conn.subscribe(
      client => {
        this.currentClient = client;
        this.panierService.synchroServer();
      }
    );
    return conn;
  }

  public creationClient(client: Client): Observable<any> {
    return this.http.post(this.urlUser, client, { withCredentials: true }).map(res => res.json());
  }

  public modifierClient(client: Client): Observable<any> {
    const conn = this.http.put(this.urlUser, client, { withCredentials: true }).map(res => res.json());
    conn.subscribe(
      reponse => {
        if (reponse.success) {
          this.currentClient = client;
        } else {
          alert(reponse.message);
        }
      }
    );
    return conn;
  }
}
