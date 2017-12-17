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

@Component({
  selector: 'app-fin-paiement',
  templateUrl: './fin-paiement.component.html',
  styleUrls: ['./fin-paiement.component.css']
})
/**
 * Composant correspondant à la fin du processus de paiement
 */
export class FinPaiementComponent implements OnInit {

  constructor(private router: Router, private serviceAchat: AchatService, private serviceConnect: ConnectionService,
    private navigationService: NavigationService) { }

  ngOnInit() {
    if (!this.serviceConnect.getConnectionStatus()) {
      this.navigationService.setCurrentOther(Globals.HOME);
      this.router.navigate([Globals.getRoute(Globals.HOME)]);
    }
    this.serviceAchat.enregistrerCommande();
  }

  private isInStock(a: Article): boolean {
    return a.book.stock > 0;
  }

  private get currentCmd(): Commande {
    return this.serviceAchat.getCommandeCourante();
  }

  private get currentArticles(): Article[] {
    return this.serviceAchat.recupererArticlesCommande(this.currentCmd);
  }

  private get shippingCost(): string {
    return this.currentCmd.shippingCost.toFixed(2);
  }

  private get totalPrice(): string {
    return (this.serviceAchat.getMontantTotalCommande(this.currentCmd) + this.currentCmd.shippingCost).toFixed(2);
  }

  private get idCommand(): number {
    return this.serviceAchat.getCommandeCourante().idCmd;
  }

  private get Address(){
    return this.serviceAchat.getCommandeCourante().shippingAddress;
  }


  public getPrice(a: Article): string {
    return (a.quantity * a.book.price).toFixed(2);
  }


  private detailLivre(livre: Livre) {
    this.navigationService.setFromLivre(livre);
    this.router.navigate([Globals.getRoute(Globals.LIVRE), livre.idBook]);
  }

  private setCurrentOther(other: string): void {
    if (Globals.otherNavPage.includes(other)) {
      this.navigationService.setCurrentOther(other);
      this.router.navigate([Globals.getRoute(other)]);
    }
  }
}
