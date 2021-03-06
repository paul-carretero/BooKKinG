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

  public displayCustomAddr;

  public addrTextarea: string;

  constructor(private router: Router, private connectionService: ConnectionService,
    private achatService: AchatService, private navigationService: NavigationService, private serviceConnect: ConnectionService) {
    this.displayCustomAddr = false;
  }


  ngOnInit() {
    if (!this.serviceConnect.getConnectionStatus() || !this.achatService.getTransactionState()) {
      this.navigationService.setCurrentOther(Globals.HOME);
      this.router.navigate([Globals.getRoute(Globals.HOME)]);
    }
  }


  get LivraisonStandard(): string {
    return Globals.prixLivraison.toFixed(2);
  }

  /**
  * Récupérer l'adresse du client
  * @param :rien
  * @return: adresse du client de type string
  */
  get addressClient(): string {
    return this.connectionService.getCurrentUser().name + ' - ' + this.connectionService.getCurrentUser().address;
  }

  get listePointLivraison(): string[] {
    return Globals.pointLivraison;
  }

  get custAddrIsValid(): boolean {
    return this.addrTextarea != null && this.addrTextarea.length > 0;
  }

  public updateCustomAddr(addr: string): void {
    this.addrTextarea = addr;
  }

  public initDisplayCustomAddr(): void {
    if (this.custAddrIsValid) {
      this.validateLivraison();
    } else {
      this.displayCustomAddr = !this.displayCustomAddr;
      if (!this.displayCustomAddr) {
        this.addrTextarea = '';
      }
    }
  }

  public validateLivraison(): void {
    this.navigationService.setCurrentOther(Globals.PAYER);
    this.router.navigate([Globals.getRoute(Globals.PAYER)]);
  }

  public ChoixPointLivraison(pointLivraison: string): void {
    this.achatService.setAddress(pointLivraison);
    this.validateLivraison();
  }

  public ChoixAdressePersonnelle(): void {
    this.achatService.setAddress(this.connectionService.getCurrentUser().address);
    this.validateLivraison();
  }
}
