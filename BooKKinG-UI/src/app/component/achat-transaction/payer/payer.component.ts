import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../../service/panier.service';
import { AchatService } from '../../../service/achat.service';
import { Globals } from '../../../globals';
import { NavigationService } from '../../../service/navigation.service';

@Component({
  selector: 'app-payer',
  templateUrl: './payer.component.html',
  styleUrls: ['./payer.component.css']
})
export class PayerComponent implements OnInit {

  constructor(private router: Router, private panierService: PanierService,
    private achatService: AchatService, private navigationService: NavigationService) { }

  ngOnInit() {
  }

  get total(): string {
    return (this.panierService.getTotalPrice() + this.achatService.getPrixLivraison()).toFixed(2);
  }

  public validerPaiement() {
    this.navigationService.setCurrentOther(Globals.FIN_PAIEMENT);
    this.router.navigate([Globals.getRoute(Globals.FIN_PAIEMENT)]);
  }
}
