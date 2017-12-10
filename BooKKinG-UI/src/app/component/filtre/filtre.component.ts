import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';
import { HeaderComponent } from '../header/header.component';
import { Globals } from '../../globals';
import { Notifiable } from '../../itf/notifiable';
import { ElementRef, Renderer2 } from '@angular/core';
import { ViewChild } from '@angular/core';
import { GenreGiver } from '../../itf/genre-giver';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css'],
})

export class FiltreComponent implements OnInit, Notifiable, GenreGiver {

  private static myInstance: GenreGiver = null;

  private genreSelected = 'ANY';

  private genres: string[];

  private maxPrice = 100;

  private minPrice = 0;

  @ViewChild('rangeSlider') el: ElementRef;

  /**
   * Singleton-like managed instance
   */
  public static getInstance(): GenreGiver {
    return FiltreComponent.myInstance;
  }

  constructor(private rd: Renderer2) {}

  ngOnInit() {
    FiltreComponent.myInstance = this;
    this.notify();
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

  /**
   * workaround : aucun event généré sur le second slider.
   */
  private onPriceChange(): void {
    const raw: string = this.el.nativeElement.value;
    const tab = raw.split(',');
    this.minPrice = Number(tab[0]);
    this.maxPrice = Number(tab[1]);
    this.notifyOther();
  }

  private setGenreSelected(genre): void {
    this.genreSelected = genre;
    this.notifyOther();
  }
}
