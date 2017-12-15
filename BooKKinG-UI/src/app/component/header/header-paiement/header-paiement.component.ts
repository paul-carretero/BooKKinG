import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';
import { AchatService } from '../../../service/achat.service';

@Component({
  selector: 'app-header-paiement',
  templateUrl: './header-paiement.component.html',
  styleUrls: ['./header-paiement.component.css']
})
export class HeaderPaiementComponent implements OnInit {

  constructor(private achatService: AchatService) { }

  ngOnInit() {
  }

  get etapePaiement(): string {
    return this.achatService.getEtapePaiement();
  }

}
