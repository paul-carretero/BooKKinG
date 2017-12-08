import { Component, OnInit } from '@angular/core';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';

import { PanierComponent } from '../panier/panier.component'

import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../../globals';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  typeLivres: string[];
  
  nombreArticles = PanierComponent.contenuPanier.length;
  static current = 'ROMAN';
  displayType = new Map<string, string>();


  typeLivres: string[] = Globals.typeLivres;

  constructor(private cookieService: CookieService) {}

  public displayableType(type: string) {
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

  public setCurrent(type: string) {
    HeaderComponent.current = type;
    this.cookieService.set('current', HeaderComponent.current);
  }

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

}
