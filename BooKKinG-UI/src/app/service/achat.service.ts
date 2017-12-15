import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { NavigationService } from './navigation.service';
import { PanierService } from './panier.service';


@Injectable()
export class AchatService {

  private readonly urlAchat = `http://` + Globals.host + `/BooKKinG-Server-web/Command`;

  private etapePaiement: string = null;

  private isInTransaction = false;

  private readonly address = { address: '' };

  constructor(private http: Http, private navService: NavigationService, private servicePanier: PanierService) {
    this.listenForNavUpdate();
  }

  // private methods //

  private listenForNavUpdate(): void {
    this.navService.suscribeForNavEvent().subscribe(
      navData => {
        if (!Globals.transactionPage.includes(navData.other)) {
          this.isInTransaction = false;
          this.etapePaiement = null;
        } else {
          this.etapePaiement = navData.other;
          this.isInTransaction = true;
        }
      }
    );
  }

  // public request //

  public enregistrerCommande(): Observable<any> {
    console.log('dans enregistrement commande');
    const reponse = this.http.post(this.urlAchat, this.address, { withCredentials: true }).map(res => res.json());
    reponse.subscribe(
      res => {
        if (res.success) {
          this.servicePanier.viderPanier();
        }
      }
    );
    return reponse;
  }

  public recupererCommandes(): Observable<any> {
    console.log('dans recupérer des commandes');
    const reponse = this.http.get(this.urlAchat, { withCredentials: true })
      .map(res => res.json());
    return reponse;
  }

  // public setter //

  public startTransaction(): void {
    this.isInTransaction = true;
  }

  public setAddress(addr: string): void {
    this.address.address = addr;
  }

  // public getter //

  public getEtapePaiement(): string {
    return this.etapePaiement;
  }

  public getTransactionState(): boolean {
    return this.isInTransaction;
  }

  public getPrixLivraison(): number {
    if (Globals.pointLivraison.includes(this.address.address)) {
      return Globals.prixLivraison;
    }
    return 0;
  }

}
