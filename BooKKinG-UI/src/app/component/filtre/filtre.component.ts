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
import { CookieService } from 'ngx-cookie-service';
import { LivreService } from '../../service/livre.service';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css'],
})

export class FiltreComponent implements OnInit, GenreGiver {

  private static myInstance: GenreGiver = null;

  private genreSelected = 'ANY';

  private genres: string[];

  private minPrice = 0;

  private maxPrice = 100;

  private minMinPrice = 0;

  private maxMaxPrice = 100;

  /**
   * Singleton-like managed instance
   */
  public static getInstance(): GenreGiver {
    return FiltreComponent.myInstance;
  }

  constructor(private router: Router, private cookieService: CookieService, private service: LivreService) {
    FiltreComponent.myInstance = this;
  }

  ngOnInit() {
    this.notify();
    if (this.getSavedCurrent() !== '') {
      this.genreSelected = this.getSavedCurrent();
    }

    this.service.initConstantes().subscribe(
      reponse => {
        if (reponse.success) {
          Globals.initData = reponse;
          this.maxMaxPrice = Globals.initData.max;
          this.maxPrice = Globals.initData.max;
          this.minPrice = Globals.initData.min;
          this.minMinPrice = Globals.initData.min;
        }
      }
    );
  }

  private getSavedCurrent(): string {
    return this.cookieService.get('currentGenre');
  }

  public setCurrentGenre(newGenre: string, updateSearch: boolean): void {
    this.genreSelected = newGenre;
    if (updateSearch) {
      this.notifyOther();
    }
    this.cookieService.set('currentGenre', this.genreSelected);
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
    this.cookieService.set('currentGenre', this.genreSelected);
    this.notifyOther();
  }
}
