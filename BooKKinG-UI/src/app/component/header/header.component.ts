import { Component, OnInit } from '@angular/core';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../../globals';
import { RouterLink, Router } from '@angular/router';
import { PanierComponent } from '../panier/panier.component';
import { ConnectionComponent } from '../../composant/connection/connection.component';
import { FiltreComponent } from '../filtre/filtre.component';
import { TypeGiver } from '../../itf/type-giver';
import { ArianeComponent } from '../ariane/ariane.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, TypeGiver {

  private static myInstance: TypeGiver;

  private current = 'HOME';

  private displayType = new Map<string, string>();

  private typeLivres: string[] = Globals.typeLivres;

  private resetOnChange = '';

  private anySearch = '';

  /**
   * Singleton-like managed instance
   */
  public static getInstance(): TypeGiver {
    return HeaderComponent.myInstance;
  }

  public getCurrentType(): string {
    return this.current;
  }

  public getAnySearch(): string {
    return this.anySearch;
  }

  constructor(private router: Router, private cookieService: CookieService) {
    HeaderComponent.myInstance = this;
  }

  ngOnInit() {
    this.displayType.set('ROMAN', 'Romans');
    this.displayType.set('MAGAZINE', 'Magazines');
    this.displayType.set('MANGA', 'Mangas');
    this.displayType.set('BD', 'BDs');
    this.displayType.set('MANUEL', 'Manuels');
    this.displayType.set('ESSAI', 'Essais');
    if (this.getSavedCurrent() !== '') {
      this.current = this.getSavedCurrent();
      if (MenuRechercheComponent.getInstance() != null) {
        MenuRechercheComponent.getInstance().notify();
      }
    }
  }

  public displayableType(type: string): string {
    return this.displayType.get(type);
  }

  private getSavedCurrent(): string {
    return this.cookieService.get('currentType');
  }

  private isCurrent(type: string): boolean {
    return type === this.current;
  }

  private notifyOther(reloadSearch: boolean): void {
    if (FiltreComponent.getInstance() != null) {
      FiltreComponent.getInstance().notify();
    }

    if (reloadSearch
      && (this.current !== 'ANY' || (this.current === 'ANY' && this.anySearch !== ''))
      && Globals.typeLivres.includes(this.current)
      && MenuRechercheComponent.getInstance() != null
    ) {
      Globals.typeLivres.includes('header before notify' + this.current);
      MenuRechercheComponent.getInstance().notify();
    }
  }

  public setCurrent(type: string, reloadSearch: boolean): void {
    this.resetOnChange = '';
    this.anySearch = '';
    this.current = type;
    this.cookieService.set('currentType', this.current);
    this.notifyOther(reloadSearch);
    if (!Globals.typeLivres.includes(this.current)) {
      ArianeComponent.getInstance().setOther(this.current);
    }
  }

  private search(str: string): void {
    this.resetOnChange = str;
    if (str.length > 1) {
      this.router.navigate(['/menu-recherche']);
    }
    if (str.length > 2) {
      this.current = 'ANY';
      this.anySearch = str;
      this.notifyOther(true);
    } else {
      this.anySearch = '';
    }
  }

  /**
   * Delegate methodes
   */

  private deconnexion(): void {
    ConnectionComponent.getInstance().deconnexion();
  }

  private getNumberOfCartItem(): number {
    return PanierComponent.getNumberOfItems();
  }

  private getTotalPriceOfCart(): number {
    return PanierComponent.getTotalPrice();
  }

  private getIdentity(): string {
    if (ConnectionComponent.getConnectionStatus()) {
      return ConnectionComponent.getUser().name;
    } else {
      return null;
    }
  }
}
