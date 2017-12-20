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
  /**
  * Constructeur du composant header-paiment
  * @param navigationService permet d'accéder aux services du composant NavigationService
  * @param achatService permet d'accéder aux services du composant AchatService
  * @param routeur permet de gérer le routage
  */
  constructor(public router: Router, private achatService: AchatService, public navigationService: NavigationService) {
    super(router, navigationService);
  }

  ngOnInit() {
  }
  /**
  * Récupérer l'étape du paiement
  * @param :rien
  * @return: une chaine de charactères
  */
  get etapePaiement(): string {
    return this.achatService.getEtapePaiement();
  }
}
