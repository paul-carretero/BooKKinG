import { PanierService } from './../../service/panier.service';
import { Livre } from './../../model/livre';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../model/article';
import { ConnectionService } from '../../service/connection.service';
import { Globals } from '../../globals';
import { AchatService } from '../../service/achat.service';
import { NavigationService } from '../../service/navigation.service';
import { TooltipDirective } from 'ng2-tooltip-directive/components';
import { NotifService } from '../../service/notif.service';
import { AbstractComponent } from '../abstract-component';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})

/**
 * Composant correspondant au panier
 */
export class PanierComponent extends AbstractComponent implements OnInit {

  constructor(public router: Router, private service: PanierService,
    private connectionService: ConnectionService, private achatService: AchatService,
    public navigationService: NavigationService, private notifService: NotifService) {
    super(router, navigationService);
  }

  ngOnInit() { }

  get montantGlobal(): string {
    return this.service.getTotalPrice().toFixed(2);
  }

  get contenuPanier(): Article[] {
    return this.service.getContenuPanier();
  }

  public getPrice(a: Article): string {
    return (a.quantity * a.book.price).toFixed(2);
  }

  public supprimer(idBook: number) {
    this.service.setQuantity(idBook, 0);
  }

  /**
   * Méthode appelée pour démarrer le processus de paiement
   * si le client est connecté alors on peut démarrer le processus de paiement
   */
  public payer(): void {
    this.achatService.startTransaction();
    if (this.connectionService.getConnectionStatus()) {
      this.navigate(Globals.LIVRAISON);
    } else {
      this.navigate(Globals.LOGIN);
    }
  }

  /**
   * Méthode pour vider le panier
   */
  public viderPanier() {
    this.notifService.publish('Votre panier a été vidé.');
    this.service.viderPanier();
  }

  public setQuantity(livre: Livre, quantity: string) {
    if (quantity != null && quantity !== '') {
      const quantiteLivre = Number(quantity);
      if (quantiteLivre !== 0) {
        this.service.setQuantity(livre.idBook, quantiteLivre);
      }
    }
  }

  get numberOfCartItem(): number {
    return this.service.getNumberOfItems();
  }
}
