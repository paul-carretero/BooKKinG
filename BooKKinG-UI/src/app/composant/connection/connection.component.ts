import { PanierComponent } from './../../component/panier/panier.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client'


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  client : Client = {identifiant:'', mdp:''};

  constructor(private routeur : Router) { }

  ngOnInit() {
    console.log("dans connection");
    
  }


  public connection(){
    this.client.id=1;
    console.log("utilisateur : " + this.client.identifiant + " connecté");
    //this.routeur.navigate(['/panier']);
  }

}
