import { Router } from '@angular/router';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';
import { HeaderComponent } from '../header/header.component';
import { Globals } from '../../globals';
import { GenreGiver } from '../../itf/genre-giver';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css'],
})

export class FiltreComponent implements OnInit, GenreGiver {

  private static myInstance: GenreGiver = null;

  private genreSelected = 'ANY';

  private genres: string[];

  private maxPrice = 100;

  private minPrice = 0;

  /**
   * Singleton-like managed instance
   */
  public static getInstance(): GenreGiver {
    return FiltreComponent.myInstance;
  }

  constructor(private router: Router) {
    FiltreComponent.myInstance = this;
  }

  ngOnInit() {
    this.notify();
  }

  public setCurrentGenre(newGenre: string, updateSearch: boolean): void {
    this.genreSelected = newGenre;
    if (updateSearch) {
      this.notifyOther();
    }
  }

  getMinPrice(): number {
    return this.minPrice;
  }

  getMaxPrice(): number {
    return this.maxPrice;
  }

  public getCurrentGenre(): string {
    return this.genreSelected;
  }

  public notify(): void {
    this.genreSelected = 'ANY';
    switch (HeaderComponent.getInstance().getCurrentType()) {
      case 'ROMAN':
        this.genres = Globals.genreRoman;
        break;
      case 'MAGAZINE':
        this.genres = Globals.genreMagazine;
        break;
      case 'MANGA':
        this.genres = Globals.genreManga;
        break;
      case 'BD':
        this.genres = Globals.genreBD;
        break;
      case 'MANUEL':
        this.genres = Globals.genreManuel;
        break;
      case 'ESSAI':
        this.genres = Globals.genreEssais;
        break;
      default:
        this.genres = Globals.genreAny;
        break;
    }
  }

  private notifyOther(): void {
    if (MenuRechercheComponent.getInstance() != null) {
      MenuRechercheComponent.getInstance().notify();
    }
  }

  private onPriceChange(raw: string, update: boolean): void {
    const tab = raw.split(',');
    this.minPrice = Number(tab[0]);
    this.maxPrice = Number(tab[1]);
    if (update) {
      this.notifyOther();
    }
  }

  private setGenreSelected(genre): void {
    this.genreSelected = genre;
    this.notifyOther();
  }
}
