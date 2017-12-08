import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historique-commandes',
  templateUrl: './historique-commandes.component.html',
  styleUrls: ['./historique-commandes.component.css']
})
export class HistoriqueCommandesComponent implements OnInit {

  static historique : Commande[];

  constructor() { }

  ngOnInit() {
  }

}

export class Commande{

}