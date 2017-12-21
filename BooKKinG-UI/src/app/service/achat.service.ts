import { Commande } from './../model/commande';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { NavigationService } from './navigation.service';
import { PanierService } from './panier.service';
import { Article } from '../model/article';
import { Livre } from '../model/livre';
import { NotifService } from './notif.service';


@Injectable()
export class AchatService {

  private readonly urlAchat = Globals.host + `/Command`;

  private readonly address = { address: '' };

  private etapePaiement: string = null;

  private isInTransaction = false;

  private commandesClient: Commande[];

  private allCommandes: Commande[];

  private commandeCourante: Commande = null;

  constructor(private http: Http, private navService: NavigationService,
    private servicePanier: PanierService, private notifService: NotifService) {
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
        if ((!Globals.transactionPage.includes(navData.other)) && navData.other !== Globals.LOGIN) {
          this.isInTransaction = false;
          this.etapePaiement = null;
        } else {
          if (Globals.transactionPage.includes(navData.other)) {
            this.etapePaiement = navData.other;
          }
        }
        if (navData.other === Globals.FIN_PAIEMENT) {
          this.recupererCommandes();
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

  /**
  * Récupérer la quantité de livre
  * @param commande : une commande
  * @param idBook : numéro du livre
  * @return: number
  */
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

  /**
  * Récupérer le montant total de commande
  * @param commande : une commande
  * @return: number
  */
  public getMontantTotalCommande(commande: Commande): number {
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

  /**
  * Récupérer les commandes du client
  * @param : rien
  * @return: tableau de commandes
  */
  public getCommandesClient(): Commande[] {
    return this.commandesClient;
  }

  /**
  * Récupérer toutes les commandes
  * @param : rien
  * @return: tableau de commandes
  */
  public getAllCommandes(): Commande[] {
    return this.allCommandes;
  }

  public récupérerAllCommandes(dStart: string, dEnd: string): void {
    const dateSet = { start: dStart, end: dEnd };
    const reponse = this.http.put(this.urlAchat, dateSet, Globals.HTTP_OPTIONS).map(res => res.json());
    reponse.subscribe(
      res => {
        if (res.success) {
          this.allCommandes = res.commands;
        } else {
          console.log(res.message);
        }
      }
    );


  }

  public calculMontantDesCommandes(): void {
    this.commandesClient.forEach(
      commande => {
        commande.total = this.getMontantTotalCommande(commande) + commande.shippingCost;
      }
    );
  }

  // public request //

  public enregistrerCommande(): void {
    this.http.post(this.urlAchat, this.address, Globals.HTTP_OPTIONS).map(res => res.json()).subscribe(
      res => {
        if (res.success) {
          this.servicePanier.viderPanier();
          this.commandeCourante = res;
          this.notifService.publish('Votre commande #' + this.commandeCourante.idCmd + ' a bien été prise en compte!');
        } else {
          console.log(res.message);
          this.commandeCourante = new Commande();
        }
      }
    );
  }

  public getCommandeCourante(): Commande {
    return this.commandeCourante;
  }

  public recupererCommandes(): void {
    this.http.get(this.urlAchat, Globals.HTTP_OPTIONS).map(res => res.json()).subscribe(
      commandes => {
        if (commandes.success) {
          this.commandesClient = commandes.commands;
          this.calculMontantDesCommandes();
        } else {
          console.log(commandes.message);
        }
      }
    );
  }

  // public setter //

  public startTransaction(): void {
    this.isInTransaction = true;
    this.commandeCourante = new Commande();
  }

  /**
  * Modifier l'adresse
  * @param : une chaine de charactères
  * @return: rien
  */
  public setAddress(addr: string): void {
    this.address.address = addr;
  }

  // public getter //

  /**
  * Récupérer l'étape de paiement
  * @param : rien
  * @return: une chaine de chacractères
  */
  public getEtapePaiement(): string {
    return this.etapePaiement;
  }

  /**
  * Retourner l'état de transaction
  * @param : rien
  * @return: vrai si c'est bien dans la transaction
  */
  public getTransactionState(): boolean {
    return this.isInTransaction;
  }

  /**
  * Récupérer le prix de livraison
  * @param : rien
  * @return: number
  */
  public getPrixLivraison(): number {
    if (!Globals.pointLivraison.includes(this.address.address)) {
      return Globals.prixLivraison;
    }
    return 0;
  }
}
