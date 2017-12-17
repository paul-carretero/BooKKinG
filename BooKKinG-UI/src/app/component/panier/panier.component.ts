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


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})

/**
 * Composant correspondant au panier
 */
export class PanierComponent implements OnInit {

  constructor(private router: Router, private service: PanierService,
    private connectionService: ConnectionService, private achatService: AchatService, private navigationService: NavigationService) { }

  ngOnInit() { }

  public detailLivre(livre: Livre) {
    this.navigationService.setFromLivre(livre);
    this.router.navigate([Globals.getRoute(Globals.LIVRE) + '/' + livre.idBook]);
  }

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

  private setCurrentHome(): void {
    this.navigationService.setCurrentOther(Globals.HOME);
    this.router.navigate([Globals.getRoute(Globals.HOME)]);
  }

  /**
  * Méthode appelée pour démarrer le processus de paiement
  */
  public payer(): void {
    console.log('dans payer du panier');
    this.achatService.startTransaction();
    // si le client est connecté alors on peut démarrer le processus de paiement
    if (this.connectionService.getConnectionStatus()) {
      this.navigationService.setCurrentOther(Globals.LIVRAISON);
      this.router.navigate([Globals.getRoute(Globals.LIVRAISON)]);
    } else {
      this.navigationService.setCurrentOther(Globals.LOGIN);
      this.router.navigate([Globals.getRoute(Globals.LOGIN)]);
    }
  }

  /**
   * Méthode pour vider le panier
   */
  public viderPanier() {
    this.service.viderPanier();
  }

  public setQuantity(livre: Livre, quantity: string) {
    const quantiteLivre = Number(quantity);
    this.service.setQuantity(livre.idBook, quantiteLivre);
  }
  
  get numberOfCartItem(): number {
    return this.service.getNumberOfItems();
  }

  /*public retourPageRecherche() {
    this.router.navigate(['menu-recherche']);
  }*/

}
