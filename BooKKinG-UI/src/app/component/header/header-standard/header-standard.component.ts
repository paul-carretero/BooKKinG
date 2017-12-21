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

  public resetOnChange = '';

  /**
  * Constructeur du composant header-standard
  * @param connectionService permet d'accéder aux services du composant ConnectionService
  * @param rechercheService permet d'accéder aux services du composant RechercheService
  * @param navigationService permet d'accéder aux services du composant NavigationService
  * @param panierService permet d'accéder aux services du composant NavigationService
  * @param routeur permet de gérer le routage
  */
  constructor(public router: Router, private connectionService: ConnectionService,
    private panierService: PanierService, public navigationService: NavigationService,
    private rechercheService: RechercheService) {
    super(router, navigationService);
  }

  ngOnInit(): void { }

  public setCurrentType(type: string): void {
    this.resetOnChange = '';
    if (Globals.typeLivre.includes(type)) {
      this.navigationService.setCurrentType(type);
    }
    this.router.navigate([Globals.getRoute(Globals.RECHERCHE)]);
  }

  public setCurrentOther(other: string): void {
    this.resetOnChange = '';
    this.navigate(other);
  }

  public search(str: string): void {
    this.resetOnChange = str;
    if (str.length > 2) {
      this.navigationService.setCurrentSearch(str);
      this.router.navigate([Globals.getRoute(Globals.RECHERCHE)]);
    } else {
      this.navigationService.setCurrentSearch('');
    }
  }

  /**
   * Delegate methodes
   */

  public deconnexion(): void {
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
  /**
  * Récupérer les types du livre
  * @param :rien
  * @return: tableau de chaine de charactères
  */
  get typeLivres(): string[] {
    return Globals.typeLivre;
  }

  get currentType(): string {
    return this.navigationService.getCurrentType();
  }

}
