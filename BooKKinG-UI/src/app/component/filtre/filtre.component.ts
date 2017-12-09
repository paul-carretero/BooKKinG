import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';
import { HeaderComponent } from '../header/header.component';
import { Globals } from '../../globals';
import { Notifiable } from '../../notifiable';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})
export class FiltreComponent implements OnInit, Notifiable {

  static filtre: Notifiable = null;

  private static genreSelected = 'ANY';

  private genres: string[];

  public static getCurrentGenre(): string {
    return FiltreComponent.genreSelected;
  }

  public static rechercheSubscribe(o: Notifiable): void {
    FiltreComponent.filtre = o;
  }

  public notify(): void {
    FiltreComponent.genreSelected = 'ANY';
    switch (HeaderComponent.getCurrentType()) {
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
    }
  }

  constructor() {}

  ngOnInit() {
    HeaderComponent.filtreSubscribe(this);
    this.notify();
  }

  private setGenreSelected(genre): void {
    FiltreComponent.genreSelected = genre;
    if (FiltreComponent != null) {
      FiltreComponent.filtre.notify();
    }
  }
}
