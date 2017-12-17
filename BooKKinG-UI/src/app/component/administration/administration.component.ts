import { Client } from './../../model/client';
import { AdministrationService } from './../../service/administration.service';
import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { ConnectionService } from '../../service/connection.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})

/**
 * Composant permettant une administration de la base de donnée
 */
export class AdministrationComponent implements OnInit {

  constructor(private service: AdministrationService, private connectionService: ConnectionService) { }

  ngOnInit() { }

  get connexionStatus() {
    return this.connectionService.getConnectionStatus();
  }

  get adminStatus(){
    return this.connectionService.getCurrentUser();
  }
}
