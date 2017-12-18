import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { Globals } from '../globals';
import { PanierService } from './panier.service';
import { NotifService } from './notif.service';
import { Subject } from 'rxjs/Subject';
import { Reponse } from '../model/reponse';

/**
 * Service dédié à la connection d'un utilisateur
 */
@Injectable()
export class ConnectionService {

  private readonly urlConnection = `http://` + Globals.host + `/BooKKinG-Server-web/Login`;

  private readonly urlUser = `http://` + Globals.host + `/BooKKinG-Server-web/User`;

  private currentClient: Client = null;

  private isConnected: boolean;

  private panierService: PanierService;

  /**
   * Construteur pour le service de connection
   * @param http permet de faire le lien avec des pages http (des servlets)
   */
  constructor(private http: Http, private notifService: NotifService) {
    this.currentClient = new Client();
    this.isConnected = false;
    this.initConnexion();
  }

  private initConnexion(): void {
    this.http.get(this.urlConnection, Globals.HTTP_OPTIONS).map(res => res.json()).subscribe(
      connected => {
        if (connected.success) {
          this.isConnected = true;
          this.recuperationInformationsClient();
          this.notifService.publish('Content de vous revoir, Votre session a été restauré.');
        } else {
          this.isConnected = false;
        }
      }
    );
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  public getCurrentUser(): Client {
    return this.currentClient;
  }

  public getPanierService() : PanierService{
    return this.panierService;
  }

  public setPanierService(panierService : PanierService) : void{
    this.panierService = panierService;
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
  public connection(client: Client): Observable<Reponse> {
    const subj = new Subject<Reponse>();
    this.http.put(this.urlConnection, client, Globals.HTTP_OPTIONS).map(res => res.json()).subscribe(
      connected => {
        if (connected.success) {
          this.isConnected = true;
          this.recuperationInformationsClient();
        } else {
          this.isConnected = false;
        }
        subj.next(connected);
      }
    );
    return subj.asObservable();
  }

  public deconnexion(): void {
    this.currentClient = new Client();
    this.isConnected = false;
    this.notifService.publish('Au revoir, et à bientôt sur BooKKinG');
    this.http.delete(this.urlConnection, Globals.HTTP_OPTIONS).map(res => res.json()).subscribe(
      res => {
        if (res.success) {
          this.panierService.viderPanier();
        } else {
          console.log(res.message);
        }
      }
    );
  }

  public reinitialiserMotDePasse(email: string): Observable<Reponse> {
    return this.http.post(this.urlConnection, { email: email }, Globals.HTTP_OPTIONS).map(res => res.json());
  }

  // ------------------------------------------------ Servlet  User ----------------------------------------------------------

  /**
   * on retourne le client récupéré (Format JSON)
   */
  public recuperationInformationsClient(): void {
    this.http.get(this.urlUser, Globals.HTTP_OPTIONS).map(res => res.json()).subscribe(
      client => {
        if (client.success) {
          this.currentClient = client;
          this.panierService.synchroServer();
        } else {
          console.log(client.message);
        }
      }
    );
  }

  public creationClient(client: Client): Observable<Reponse> {
    const subj = new Subject<Reponse>();
    this.http.post(this.urlUser, client, Globals.HTTP_OPTIONS).map(res => res.json()).subscribe(
      reponse => {
        if (reponse.success) {
          this.isConnected = true;
          this.currentClient = client;
        } else {
          this.isConnected = false;
        }
        subj.next(reponse);
      }
    );
    return subj.asObservable();
  }

  public modifierClient(client: Client): Observable<Reponse> {
    const subj = new Subject<Reponse>();
    this.http.put(this.urlUser, client, Globals.HTTP_OPTIONS).map(res => res.json()).subscribe(
      reponse => {
        if (reponse.success) {
          this.currentClient = client;
        } else {
          alert(reponse.message); // ici le bug
        }
        subj.next(reponse);
      }
    );
    return subj.asObservable();
  }
}
