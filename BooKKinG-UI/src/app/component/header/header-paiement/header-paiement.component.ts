import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';
import { AchatService } from '../../../service/achat.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../../service/navigation.service';
import { AbstractComponent } from '../../abstract-component';

@Component({
  selector: 'app-header-paiement',
  templateUrl: './header-paiement.component.html',
  styleUrls: ['./header-paiement.component.css']
})
export class HeaderPaiementComponent extends AbstractComponent implements OnInit {

  constructor(public router: Router, private achatService: AchatService, public navigationService: NavigationService) {
    super(router, navigationService);
  }

  ngOnInit() {
  }

  get etapePaiement(): string {
    return this.achatService.getEtapePaiement();
  }
}
