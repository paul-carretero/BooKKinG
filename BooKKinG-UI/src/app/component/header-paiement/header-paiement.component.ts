import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';

@Component({
  selector: 'app-header-paiement',
  templateUrl: './header-paiement.component.html',
  styleUrls: ['./header-paiement.component.css']
})
export class HeaderPaiementComponent implements OnInit {
  static test :string='';
  constructor() { }

  ngOnInit() {
  }

  get etapePaiement():string{
    return Globals.getMode();
  }

}
