import { Router } from '@angular/router';
import { LivraisonComponent } from './../livraison/livraison.component';
import { ConnectionComponent } from './../../composant/connection/connection.component';
import { PanierComponent } from './../panier/panier.component';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Livre } from '../../model/livre';

@Component({
  selector: 'app-payer',
  templateUrl: './payer.component.html',
  styleUrls: ['./payer.component.css']
})
export class PayerComponent implements OnInit {
  static enCoursDePaiement : boolean;

  client : Client;

  listeLivre : Livre[];
  total : number;

  constructor(private router : Router) { }

  ngOnInit() {
    PayerComponent.enCoursDePaiement = true; 
    console.log("init de payer");
    this.listeLivre = PanierComponent.tabLivre;
    this.total = PanierComponent.montantTotal + LivraisonComponent.prixLivraison;
    this.client = ConnectionComponent.client;
  }

  
  public paiementPayPal(){
    console.log("payer avec paypal");
    PayerComponent.enCoursDePaiement = false;
    this.router.navigate(['finPaiement']);
  }

  public paiementCB(){
    console.log("payer avec Carte Bancaire");
    PayerComponent.enCoursDePaiement = false;
    this.router.navigate(['finPaiement']);
  }

}
