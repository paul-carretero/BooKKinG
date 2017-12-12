import { PanierService } from './../../service/panier.service';
import { Livre } from './../../model/livre';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayerComponent } from '../payer/payer.component';
import { Article } from '../../model/article';
import { ConnectionService } from '../../service/connection.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})

/**
 * Composant correspondant au panier
 */
export class PanierComponent implements OnInit {

  constructor(private router: Router, private service: PanierService, private connectionService: ConnectionService) { }

  ngOnInit() { }

  public detailLivre(livre: Livre) {
    this.router.navigate(['/livre/' + livre.idBook]);
  }

  get montantGlobal(): string {
    return this.service.getTotalPrice().toFixed(2);
  }

  get contenuPanier(): Article[] {
    return this.service.getContenuPanier();
  }

  public supprimer(idBook: number) {
    this.service.setQuantity(idBook, 0);
  }

  /**
  * Méthode appelée pour démarrer le processus de paiement
  */
  public payer() {
    console.log('dans payer du panier');
    PayerComponent.setEnCoursDePaiement(true);
    // si le client est connecté alors on peut démarrer le processus de paiement
    if (this.connectionService.getConnectionStatus()) {
      this.router.navigate(['livraison']);
    } else {
      this.router.navigate(['/identification-inscription']);
    }
  }

  /**
   * Méthode pour vider le panier
   */
  public viderPanier() {
    this.service.viderPanier();
  }

  public setQuantity(livre: Livre, quantity: any) {
    const quantiteLivre = Number(quantity.target.value);
    this.service.setQuantity(livre.idBook, quantiteLivre);
  }
}
