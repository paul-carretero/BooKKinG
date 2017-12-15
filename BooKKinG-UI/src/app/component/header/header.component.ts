import { Component, OnInit } from '@angular/core';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';
import { Globals } from '../../globals';
import { RouterLink, Router } from '@angular/router';
import { ConnectionService } from '../../service/connection.service';
import { PanierService } from '../../service/panier.service';
import { NavigationService } from '../../service/navigation.service';
import { RechercheService } from '../../service/recherche.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private resetOnChange = '';

  constructor(private router: Router, private connectionService: ConnectionService,
    private panierService: PanierService, private navigationService: NavigationService,
    private rechercheService: RechercheService) { }

  ngOnInit() { }

  private displayableType(type: string): string {
    return Globals.getDisplayableName(type);
  }

  private setCurrentType(type: string): void {
    this.resetOnChange = '';
    this.rechercheService.setCurrentSearch('');
    if (Globals.typeLivre.includes(type)) {
      this.navigationService.setCurrentType(type);
    }
  }

  private setCurrentOther(other: string): void {
    this.resetOnChange = '';
    this.rechercheService.setCurrentSearch('');
    if (other === 'HOME') {
      Globals.setEtat(false);
    }
    // if (Globals.otherNavPage.includes(other)) {
    this.navigationService.setCurrentOther(other);
    // }
  }

  private search(str: string): void {
    this.resetOnChange = str;
    if (str.length > 2) {
      this.navigationService.setCurrentType('ANY');
      this.router.navigate(['/menu-recherche']);
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

  get getEtape(): string {
    return Globals.getMode();
  }

  get getEtatPayer(): boolean {
    return Globals.payer;
  }
}
