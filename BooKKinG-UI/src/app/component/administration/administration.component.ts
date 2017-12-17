import { Client } from './../../model/client';
import { AdministrationService } from './../../service/administration.service';
import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { ConnectionService } from '../../service/connection.service';
import { Router } from '@angular/router';
import { NotifService } from '../../service/notif.service';
import { Globals } from '../../globals';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})

/**
 * Composant permettant une administration de la base de donnée
 */
export class AdministrationComponent implements OnInit {

  private readonly options = ['Ajouter un livre', 'Mettre à jour le stock', 'Visualiser commandes clients'];

  private current = 0;

  constructor(private service: AdministrationService, private connectionService: ConnectionService,
    private router: Router, private notifService: NotifService) { }

  ngOnInit() {
    if ((!this.connectionService.getConnectionStatus()) || (!this.connectionService.getCurrentUser().admin)) {
      this.notifService.getSubject().next('Erreur : Vous n\' êtes pas administrateur');
      this.router.navigate([Globals.getRoute(Globals.LOGIN)]);
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
