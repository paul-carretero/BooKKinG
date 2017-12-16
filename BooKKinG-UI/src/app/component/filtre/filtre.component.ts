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
import { NavigationService } from '../../service/navigation.service';
import { RechercheService } from '../../service/recherche.service';
import { InitService } from '../../service/init.service';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css'],
})

export class FiltreComponent implements OnInit {

  private minPrice = 0;

  private maxPrice = 100;

  private minMinPrice = 0;

  private maxMaxPrice = 100;

  constructor(private router: Router, private navigationService: NavigationService,
    private rechercheService: RechercheService, private initService: InitService) {
  }

  ngOnInit() {
    this.initService.initConstantes().subscribe(
      reponse => {
        if (reponse.success) {
          this.maxMaxPrice = reponse.max;
          this.maxPrice = reponse.max;
          this.minPrice = reponse.min;
          this.minMinPrice = reponse.min;
        }
      }
    );
  }

  get classTransaction(): string {
    if (Globals.transactionPage.includes(this.navigationService.getCurrentOther())) {
      return 'nodisplay';
    }
    return '';
  }

  get genres(): string[] {
    const currentType = this.navigationService.getCurrentType();
    if (Globals.typeLivre.includes(currentType)) {
      return Globals.genreLivres.get(currentType);
    } else {
      return Globals.genreLivres.get('ANY');
    }
  }

  get currentGenre(): string {
    return this.navigationService.getCurrentGenre();
  }

  private displayableGenre(genre: string): string {
    return Globals.getDisplayableName(genre);
  }

  private setCurrentGenre(newGenre: string): void {
    this.navigationService.setCurrentGenre(newGenre);
  }

  private onPriceChange(raw: string, update: boolean): void {
    const tab = raw.split(',');
    this.minPrice = Number(tab[0]);
    this.maxPrice = Number(tab[1]);
    if (update) {
      this.rechercheService.setMinPrice(Number(tab[0]));
      this.rechercheService.setMaxPrice(Number(tab[1]));
    }
  }
}
