import { Router } from '@angular/router';
import { LivraisonComponent } from './../livraison/livraison.component';
import { ConnectionComponent } from './../../composant/connection/connection.component';
import { PanierComponent } from './../panier/panier.component';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Livre } from '../../model/livre';
import { Article } from '../../model/article';

@Component({
  selector: 'app-payer',
  templateUrl: './payer.component.html',
  styleUrls: ['./payer.component.css']
})
export class PayerComponent implements OnInit {

  private static enCoursDePaiement: boolean;
  private client: Client;
  private listeLivre: Article[];
  private total: number;

  public static setEnCoursDePaiement(b: boolean) {
    PayerComponent.enCoursDePaiement = b;
  }

  constructor(private router: Router) { }

  ngOnInit() {
    PayerComponent.enCoursDePaiement = true;
    console.log('init de payer');
    this.listeLivre = PanierComponent.contenuPanier;
    this.total = PanierComponent.getTotalPrice() + LivraisonComponent.prixLivraison;
    this.client = ConnectionComponent.client;
  }

  public paiementPayPal() {
    console.log('payer avec paypal');
    PayerComponent.enCoursDePaiement = false;
    this.router.navigate(['finPaiement']);
  }

  public paiementCB() {
    console.log('payer avec Carte Bancaire');
    PayerComponent.enCoursDePaiement = false;
    this.router.navigate(['finPaiement']);
  }
}
