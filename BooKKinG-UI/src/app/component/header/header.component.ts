import { Component, OnInit } from '@angular/core';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../../globals';
import { RouterLink } from '@angular/router';
import { PanierComponent } from '../panier/panier.component';
import { ConnectionComponent } from '../../composant/connection/connection.component';
import { FiltreComponent } from '../filtre/filtre.component';
import { Notifiable } from '../../notifiable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private static current = 'ROMAN';
  private static filtre: Notifiable = null;
  private static recherche: Notifiable = null;
  private displayType = new Map<string, string>();
  private typeLivres: string[] = Globals.typeLivres;

  public static getCurrentType(): string {
    return HeaderComponent.current;
  }

  public static rechercheSubscribe(o: Notifiable) {
    HeaderComponent.recherche = o;
  }

  static filtreSubscribe(o: Notifiable): any {
    HeaderComponent.filtre = o;
  }

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    console.log(this.getSavedCurrent());
    if ( this.getSavedCurrent() !== '') {
      HeaderComponent.current = this.getSavedCurrent();
    }
    this.displayType.set('ROMAN', 'Romans');
    this.displayType.set('MAGAZINE', 'Magazines');
    this.displayType.set('MANGA', 'Mangas');
    this.displayType.set('BD', 'BDs');
    this.displayType.set('MANUEL', 'Manuels');
    this.displayType.set('ESSAI', 'Essais');
  }

  public displayableType(type: string): string {
    return this.displayType.get(type);
  }

  private getSavedCurrent(): string {
    return this.cookieService.get('current');
  }

  private isCurrent(type: string): boolean {
    return type === HeaderComponent.current;
  }

  get staticCurrent(): string{
    return HeaderComponent.current;
  }

  public setCurrent(type: string): void {
    HeaderComponent.current = type;
    this.cookieService.set('current', HeaderComponent.current);
    if (HeaderComponent.filtre != null) {
      HeaderComponent.filtre.notify();
    }
    if (HeaderComponent.recherche != null) {
      HeaderComponent.recherche.notify();
    }
  }

  /**
   * Delegate methodes
   */

  public getNumberOfCartItem(): number {
    return PanierComponent.getNumberOfItems();
  }

  public getTotalPriceOfCart(): number {
    return PanierComponent.getTotalPrice();
  }

  public getIdentity(): string {
    if (ConnectionComponent.getConnectionStatus()) {
      return ConnectionComponent.getUser().name;
    } else {
      return 'Login/Register';
    }
  }
}
