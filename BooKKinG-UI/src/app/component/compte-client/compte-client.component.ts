import { ConnectionService } from './../../service/connection.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../service/navigation.service';
import { AbstractComponent } from '../abstract-component';
import { Globals } from '../../globals';
import { AchatService } from '../../service/achat.service';

@Component({
  selector: 'app-compte-client',
  templateUrl: './compte-client.component.html',
  styleUrls: ['./compte-client.component.css']
})
export class CompteClientComponent extends AbstractComponent implements OnInit {

  private readonly options = ['Mes Informations', 'Mes Commandes'];

  private current = 0;

  constructor(public router: Router, private connectionService: ConnectionService,
    public navigationService: NavigationService, private serviceCommande: AchatService) {
    super(router, navigationService);
  }

  ngOnInit() {
    if ((!this.connectionService.getConnectionStatus())) {
      this.navigate(Globals.HOME);
    } else {
      this.serviceCommande.recupererCommandes();
    }
  }

  private isActiveClass(i: number): string {
    if (this.current === i) {
      return 'active';
    }
    return '';
  }

  private setCurrent(i: number) {
    this.current = i;
  }
}
