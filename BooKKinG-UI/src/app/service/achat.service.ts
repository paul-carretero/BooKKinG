import { Commande } from './../model/commande';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { NavigationService } from './navigation.service';
import { PanierService } from './panier.service';
import { Article } from '../model/article';
import { Livre } from '../model/livre';


@Injectable()
export class AchatService {

  private readonly urlAchat = `http://` + Globals.host + `/BooKKinG-Server-web/Command`;

  private readonly address = { address: '' };

  private etapePaiement: string = null;

  private isInTransaction = false;

  private commandesClient: Commande[];

  private commandeCourante: Commande = null;

  constructor(private http: Http, private navService: NavigationService, private servicePanier: PanierService) {
    this.listenForNavUpdate();
    this.commandesClient = [];
    this.commandeCourante = new Commande();
    if (Globals.transactionPage.includes(this.navService.getCurrentOther())) {
      this.isInTransaction = true;
      this.etapePaiement = this.navService.getCurrentOther();
    }
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

  /*--------    Fonctions pour traiter des commandes      --------- */
  public recupererArticlesCommande(commande: Commande): Article[] {
    const articles: Article[] = [];
    let i = 0;
    while (i < commande.books.length) {
      articles[i] = new Article();
      articles[i].book = new Livre();
      articles[i].book = commande.books[i];
      articles[i].idBook = commande.books[i].idBook;
      articles[i].quantity = this.getQuantity(commande, commande.books[i].idBook);
      i++;
    }
    return articles;
  }

  public getQuantity(commande: Commande, idBook: number): number {
    let quantity: number;
    let i = 0;
    let trouve = false;
    while (!trouve && i < commande.items.length) {
      if (commande.items[i].idBook === idBook) {
        quantity = commande.items[i].quantity;
        trouve = true;
      }
      i++;
    }
    return quantity;
  }


  public getMontantTotalCommande(commande: Commande) {
    let articlesCommande: Article[];
    articlesCommande = this.recupererArticlesCommande(commande);
    let total = 0;
    articlesCommande.forEach(
      article => {
        total = total + (article.book.price * 100 * this.getQuantity(commande, article.book.idBook));
      }
    );
    return total / 100;

  }

  public getCommandesClient() {
    return this.commandesClient;
  }

  public getCommandeCourante() {
    return this.commandeCourante;
  }

  public calculMontantDesCommandes() {
    this.commandesClient.forEach(
      commande => {
        commande.total = this.getMontantTotalCommande(commande) + commande.shippingCost;
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
        } else {
          console.log(res.message);
        }
      }
    );
    return reponse;
  }


  public recupererCommandes(): Observable<any> {
    console.log('dans recupérer des commandes');
    const reponse = this.http.get(this.urlAchat, { withCredentials: true }).map(res => res.json());
    reponse.subscribe(
      commandes => {
        if (commandes.success) {
          this.commandesClient = commandes.commands;
          this.calculMontantDesCommandes();
        } else {
          console.log(commandes.message);
        }
      }
    );
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
    if (!Globals.pointLivraison.includes(this.address.address)) {
      return Globals.prixLivraison;
    }
    return 0;
  }
}
