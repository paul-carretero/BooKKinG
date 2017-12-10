import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { Globals } from '../../globals';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';
import { FiltreComponent } from '../filtre/filtre.component';

@Component({
  selector: 'app-ariane',
  templateUrl: './ariane.component.html',
  styleUrls: ['./ariane.component.css']
})
export class ArianeComponent implements OnInit {

  private static myInstance: ArianeComponent;

  private typeName = null;

  private genreName = null;

  private typeNameDisplay = null;

  private genreNameDisplay = null;

  private currentLivre: Livre = null;

  public static getInstance(): ArianeComponent {
    return ArianeComponent.myInstance;
  }

  constructor(private router: Router) {
    ArianeComponent.myInstance = this;
  }

  ngOnInit() { }

  public autoResolve(): void {
    const url = this.router.url;
    // TODO
  }

  private onClickType(): void {
    HeaderComponent.getInstance().setCurrent(this.typeName, true);
    this.genreName = null;
    this.currentLivre = null;
  }

  private onClickGenre(): void {
    FiltreComponent.getInstance().setCurrentGenre(this.genreName, true);
    this.currentLivre = null;
  }

  private onClickHome(): void {
    this.typeName = null;
    this.genreName = null;
    this.currentLivre = null;
    HeaderComponent.getInstance().setCurrent('NONE', false);
  }

  public setTypeName(newType: string): void {
    this.typeName = newType;
    this.currentLivre = null;
    if (this.typeName === 'NONE') {
      this.typeName = null;
    }
  }

  public setGenreName(newGenre: string): void {
    this.genreName = newGenre;
    this.currentLivre = null;
  }

  public setLivre(livre: Livre): void {
    this.currentLivre = livre;
    this.typeName = livre.type;
    this.genreName = livre.genre;
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private getDisplayableCommon(): string {
    switch (this.typeName) {
      case 'identification-inscription':
        return 'Login';
      default:
        return this.capitalizeFirstLetter(this.typeName);
    }
  }

  private getFirstLevelDisplay(): string {
    if (Globals.typeLivres.includes(this.typeName)) {
      return HeaderComponent.getInstance().displayableType(this.typeName);
    } else {
      return this.getDisplayableCommon();
    }
  }
}
