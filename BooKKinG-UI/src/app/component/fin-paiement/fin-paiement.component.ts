import { Component, OnInit } from '@angular/core';
import { PanierComponent } from '../panier/panier.component';

@Component({
  selector: 'app-fin-paiement',
  templateUrl: './fin-paiement.component.html',
  styleUrls: ['./fin-paiement.component.css']
})
export class FinPaiementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    PanierComponent.tabLivre =[];

  }

}
