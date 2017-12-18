import { ConnectionService } from './../../../service/connection.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';
import { AchatService } from '../../../service/achat.service';
import { TooltipDirective } from 'ng2-tooltip-directive/components';
import { NavigationService } from '../../../service/navigation.service';


@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})

/**
 * Composant correspondant à la livraison
 */
export class LivraisonComponent implements OnInit {

  private displayCustomAddr;

  private addrTextarea: string;

  constructor(private router: Router, private connectionService: ConnectionService,
    private achatService: AchatService, private navigationService: NavigationService, private serviceConnect: ConnectionService) {
    this.displayCustomAddr = false;
  }


  ngOnInit() {
    if (!this.serviceConnect.getConnectionStatus() || !this.achatService.getTransactionState()) {
      alert('plz...' + this.serviceConnect.getConnectionStatus());
      this.navigationService.setCurrentOther(Globals.HOME);
      this.router.navigate([Globals.getRoute(Globals.HOME)]);
    }
  }

  get LivraisonStandard(): string {
    return Globals.prixLivraison.toFixed(2);
  }

  get addressClient(): string {
    return this.connectionService.getCurrentUser().name + ' - ' + this.connectionService.getCurrentUser().address;
  }

  get listePointLivraison(): string[] {
    return Globals.pointLivraison;
  }

  get custAddrIsValid(): boolean {
    return this.addrTextarea != null && this.addrTextarea.length > 0;
  }

  private updateCustomAddr(addr: string): void {
    this.addrTextarea = addr;
  }

  private initDisplayCustomAddr(): void {
    if (this.custAddrIsValid) {
      this.validateLivraison();
    } else {
      this.displayCustomAddr = !this.displayCustomAddr;
      if (!this.displayCustomAddr) {
        this.addrTextarea = '';
      }
    }
  }

  private validateLivraison(): void {
    this.navigationService.setCurrentOther(Globals.PAYER);
    this.router.navigate([Globals.getRoute(Globals.PAYER)]);
  }

  private ChoixPointLivraison(pointLivraison: string) {
    this.achatService.setAddress(pointLivraison);
    this.validateLivraison();
  }

  private ChoixAdressePersonnelle() {
    this.achatService.setAddress(this.connectionService.getCurrentUser().address);
    this.validateLivraison();
  }
}
