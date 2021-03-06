import { PanierService } from './../../../service/panier.service';
import { AchatService } from './../../../service/achat.service';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';
import { ConnectionService } from '../../../service/connection.service';
import { LivraisonComponent } from '../livraison/livraison.component';
import { NavigationService } from '../../../service/navigation.service';
import { Router } from '@angular/router';
import { Commande } from '../../../model/commande';
import { Article } from '../../../model/article';
import { Livre } from '../../../model/livre';
import { AbstractComponent } from '../../abstract-component';

@Component({
  selector: 'app-fin-paiement',
  templateUrl: './fin-paiement.component.html',
  styleUrls: ['./fin-paiement.component.css']
})
/**
 * Composant correspondant à la fin du processus de paiement
 */
export class FinPaiementComponent extends AbstractComponent implements OnInit {

  constructor(public router: Router, private serviceAchat: AchatService, private serviceConnect: ConnectionService,
    public navigationService: NavigationService) {
    super(router, navigationService);
  }

  ngOnInit() {
    if (!this.serviceConnect.getConnectionStatus()) {
      this.navigationService.setCurrentOther(Globals.HOME);
      this.router.navigate([Globals.getRoute(Globals.HOME)]);
    } else {
      this.serviceAchat.enregistrerCommande();
    }
  }

  private isInStock(a: Article): boolean {
    return a.book.stock > 0;
  }

  get currentCmd(): Commande {
    return this.serviceAchat.getCommandeCourante();
  }

  get currentArticles(): Article[] {
    return this.serviceAchat.recupererArticlesCommande(this.currentCmd);
  }

  get shippingCost(): string {
    return this.currentCmd.shippingCost.toFixed(2);
  }

  get totalPrice(): string {
    return (this.serviceAchat.getMontantTotalCommande(this.currentCmd) + this.currentCmd.shippingCost).toFixed(2);
  }

  /**
  * Récupérer ID de commande
  * @param :rien
  * @return: un ID de commande de type number
  */
  get idCommand(): number {
    return this.serviceAchat.getCommandeCourante().idCmd;
  }

  /**
  * Récupérer adresse
  * @param :rien
  * @return: un ID de commande de type number
  */
  get Address() {
    return this.serviceAchat.getCommandeCourante().shippingAddress;
  }

  public getPrice(a: Article): string {
    return (a.quantity * a.book.price).toFixed(2);
  }
}
