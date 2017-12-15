import { Router } from '@angular/router';
import { LivraisonComponent } from './../livraison/livraison.component';
import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../service/panier.service';
import { AchatService } from '../../service/achat.service';
import { Globals } from '../../globals';

@Component({
  selector: 'app-payer',
  templateUrl: './payer.component.html',
  styleUrls: ['./payer.component.css']
})
export class PayerComponent implements OnInit {

  constructor(private router: Router, private panierService: PanierService, private achatService: AchatService) { }

  ngOnInit() {
  }

  get total(): string {
    return this.panierService.getTotalPrice() + this.achatService.getPrixLivraison().toFixed(2);
  }

  public validerPaiement() {
    this.router.navigate([Globals.getRoute(Globals.FIN_PAIEMENT)]);
  }
}
