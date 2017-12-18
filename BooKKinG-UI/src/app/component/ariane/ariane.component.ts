import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { Globals } from '../../globals';
import { HeaderComponent } from '../header/header.component';
import { FiltreComponent } from '../filtre/filtre.component';
import { NavigationService } from '../../service/navigation.service';
import { Router } from '@angular/router';
import { AbstractComponent } from '../abstract-component';

@Component({
  selector: 'app-ariane',
  templateUrl: './ariane.component.html',
  styleUrls: ['./ariane.component.css']
})
export class ArianeComponent extends AbstractComponent implements OnInit {

  constructor(public navigationService: NavigationService, public router: Router) {
    super(router, navigationService);
  }

  ngOnInit() { }

  get genreName(): string {
    return this.navigationService.getCurrentGenre();
  }

  get typeName(): string {
    return this.navigationService.getCurrentType();
  }

  get currentEnd(): string {
    const currentEnd = this.navigationService.getCurrentOther();
    if (currentEnd === Globals.LIVRE) {
      return this.navigationService.getCurrentLivreTitle();
    }
    return currentEnd;
  }

  private onClickType(): void {
    this.navigationService.setCurrentType(this.typeName);
    this.router.navigate([Globals.getRoute(Globals.RECHERCHE)]);
  }

  private onClickGenre(): void {
    this.navigationService.setCurrentGenre(this.genreName);
    this.router.navigate([Globals.getRoute(Globals.RECHERCHE)]);
  }
}
