import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';
import { AchatService } from '../../../service/achat.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../../service/navigation.service';

@Component({
  selector: 'app-header-paiement',
  templateUrl: './header-paiement.component.html',
  styleUrls: ['./header-paiement.component.css']
})
export class HeaderPaiementComponent implements OnInit {

  constructor(private router: Router, private achatService: AchatService, private navService: NavigationService) { }

  ngOnInit() {
  }

  get etapePaiement(): string {
    return this.achatService.getEtapePaiement();
  }

  public navigate(where: string): void {
    this.navService.setCurrentOther(where);
    this.router.navigate([Globals.getRoute(where)]);
  }
}
