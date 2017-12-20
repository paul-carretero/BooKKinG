import { Component, OnInit } from '@angular/core';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { ConnectionService } from '../../service/connection.service';
import { PanierService } from '../../service/panier.service';
import { NavigationService } from '../../service/navigation.service';
import { RechercheService } from '../../service/recherche.service';
import { AchatService } from '../../service/achat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /**
  * Constructeur du composant header
  * @param connectionService permet d'accéder aux services du composant ConnectionService
  * @param achatService permet d'accéder aux services du composant AchatService
  */

  constructor(private achatService: AchatService, private connectionService: ConnectionService) { }

  ngOnInit() { }

  get isInTransaction(): boolean {
    return this.achatService.getTransactionState() && this.connectionService.getConnectionStatus();
  }
}
