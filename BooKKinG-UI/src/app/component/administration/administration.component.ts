import { Router } from '@angular/router';
import { NavigationService } from './../../service/navigation.service';
import { AdministrationService } from './../../service/administration.service';
import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../service/connection.service';
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

  constructor(private service: AdministrationService, private connectionService: ConnectionService,
    private navigationService:NavigationService, private router : Router) { }

  ngOnInit() { }

  get connexionStatus() {
    return this.connectionService.getConnectionStatus();
  }

  get adminStatus(){
    return this.connectionService.getCurrentUser().admin;
  }

  private goConnection(){
    this.navigationService.setCurrentOther(Globals.LOGIN);
    this.router.navigate([Globals.getRoute(Globals.LOGIN)]);
  }
}
