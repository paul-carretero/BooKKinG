import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { ConnectionComponent } from '../../composant/connection/connection.component';

@Component({
  selector: 'app-compte-client',
  templateUrl: './compte-client.component.html',
  styleUrls: ['./compte-client.component.css']
})
export class CompteClientComponent implements OnInit {
  client: Client;

  constructor() { }

  ngOnInit() {
    this.client = ConnectionComponent.client;
  }


  
}
