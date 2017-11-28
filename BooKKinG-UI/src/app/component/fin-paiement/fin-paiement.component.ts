import { Component, OnInit } from '@angular/core';
import { PanierComponent } from '../panier/panier.component';

@Component({
  selector: 'app-fin-paiement',
  templateUrl: './fin-paiement.component.html',
  styleUrls: ['./fin-paiement.component.css']
})
/**
 * Composant correspondant à la fin du processus de paiement
 */
export class FinPaiementComponent implements OnInit {

  constructor() { }


  ngOnInit() {
    // on vide le panier
    PanierComponent.tabLivre =[];
    PanierComponent.montantTotal = 0;

    // A faire => enregistrer la commande du client
  }

}
