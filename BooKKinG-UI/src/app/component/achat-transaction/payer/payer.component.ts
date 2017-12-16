import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../../service/panier.service';
import { AchatService } from '../../../service/achat.service';
import { Globals } from '../../../globals';
import { NavigationService } from '../../../service/navigation.service';
import { ConnectionService } from '../../../service/connection.service';

@Component({
  selector: 'app-payer',
  templateUrl: './payer.component.html',
  styleUrls: ['./payer.component.css']
})
export class PayerComponent implements OnInit {

  private readonly payementsOption = ['credit-card', 'paypal', 'exchange'];

  constructor(private router: Router, private panierService: PanierService, private serviceConnect: ConnectionService,
    private achatService: AchatService, private navigationService: NavigationService) { }

  ngOnInit() {
    if (!this.serviceConnect.getConnectionStatus() || !this.achatService.getTransactionState()) {
      this.navigationService.setCurrentOther(Globals.HOME);
      this.router.navigate([Globals.getRoute(Globals.HOME)]);
    }
  }

  get total(): string {
    return (this.panierService.getTotalPrice() + this.achatService.getPrixLivraison()).toFixed(2);
  }

  private getDisplayable(p: string): string {
    if (p === 'credit-card') {
      return 'Carte de Crédit';
    } else if (p === 'paypal') {
      return 'PayPal';
    } else {
      return 'Virement Bancaire';
    }
  }

  private validerPaiement(): void {
    this.navigationService.setCurrentOther(Globals.FIN_PAIEMENT);
    this.router.navigate([Globals.getRoute(Globals.FIN_PAIEMENT)]);
  }
}
