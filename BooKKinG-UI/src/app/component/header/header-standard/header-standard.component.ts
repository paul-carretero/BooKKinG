import { Component, OnInit } from '@angular/core';
import { MenuRechercheComponent } from '../../menu-recherche/menu-recherche.component';
import { Globals } from '../../../globals';
import { Router } from '@angular/router';
import { ConnectionService } from '../../../service/connection.service';
import { PanierService } from '../../../service/panier.service';
import { NavigationService } from '../../../service/navigation.service';
import { RechercheService } from '../../../service/recherche.service';
import { AbstractComponent } from '../../abstract-component';

@Component({
  selector: 'app-header-standard',
  templateUrl: './header-standard.component.html',
  styleUrls: ['./header-standard.component.css']
})
export class HeaderStandardComponent extends AbstractComponent implements OnInit {

  private resetOnChange = '';

  constructor(public router: Router, private connectionService: ConnectionService,
    private panierService: PanierService, public navigationService: NavigationService,
    private rechercheService: RechercheService) {
    super(router, navigationService);
  }

  ngOnInit(): void { }

  private setCurrentType(type: string): void {
    this.resetOnChange = '';
    this.rechercheService.setCurrentSearch('');
    if (Globals.typeLivre.includes(type)) {
      this.navigationService.setCurrentType(type);
    }
    this.router.navigate([Globals.getRoute(Globals.RECHERCHE)]);
  }

  private setCurrentOther(other: string): void {
    this.resetOnChange = '';
    this.rechercheService.setCurrentSearch('');
    this.navigate(other);
  }

  private search(str: string): void {
    this.resetOnChange = str;
    if (str.length > 2) {
      this.navigationService.setCurrentType('ANY');
      this.router.navigate([Globals.getRoute(Globals.RECHERCHE)]);
      this.rechercheService.setCurrentSearch(str);
    } else {
      this.rechercheService.setCurrentSearch('');
    }
  }

  /**
   * Delegate methodes
   */

  private deconnexion(): void {
    this.connectionService.deconnexion();
  }

  get identity(): string {
    if (this.connectionService.getConnectionStatus()) {
      return this.connectionService.getCurrentUser().name;
    } else {
      return null;
    }
  }

  get numberOfCartItem(): number {
    return this.panierService.getNumberOfItems();
  }

  get totalPriceOfCart(): number {
    return this.panierService.getTotalPrice();
  }

  get typeLivres(): string[] {
    return Globals.typeLivre;
  }

  get currentType(): string {
    return this.navigationService.getCurrentType();
  }

}
