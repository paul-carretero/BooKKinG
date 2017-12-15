import { Router } from '@angular/router';
import { LivraisonComponent } from './../livraison/livraison.component';
import { ConnectionComponent } from './../../component/connection/connection.component';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Livre } from '../../model/livre';
import { Article } from '../../model/article';
import { PanierService } from '../../service/panier.service';
import { Globals } from '../../globals';

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
  private mode_paiment:boolean;

  public static setEnCoursDePaiement(b: boolean) {
    PayerComponent.enCoursDePaiement = b;
  }

  constructor(private router: Router, private panierService: PanierService) { }

  ngOnInit() {
    PayerComponent.enCoursDePaiement = true;
    console.log('init de payer');
    this.listeLivre = this.panierService.getContenuPanier();
    this.total = this.panierService.getTotalPrice() + LivraisonComponent.prixLivraison;
    this.mode_paiment =false;
  }

  public setModepaiment(b:boolean){
    this.mode_paiment=b;
  }

  public validerPaiement()
  {
    if(this.mode_paiment == false){
      console.log('payer avec paypal');
      PayerComponent.enCoursDePaiement = false;
      this.router.navigate(['finPaiement']);
    }else{
      console.log('payer avec cartebancaire');
      PayerComponent.enCoursDePaiement = false;
      this.router.navigate(['finPaiement']);
    }
  }
  public setMode(mode : string):string{
    return Globals.etapePaiment=mode;
  }
}
