import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { Globals } from '../../globals';
import { HeaderComponent } from '../header/header.component';
import { FiltreComponent } from '../filtre/filtre.component';
import { NavigationService } from '../../service/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ariane',
  templateUrl: './ariane.component.html',
  styleUrls: ['./ariane.component.css']
})
export class ArianeComponent implements OnInit {

  constructor(private navigationService: NavigationService, private router: Router) { }

  ngOnInit() { }

  get genreName(): string {
    return this.navigationService.getCurrentGenre();
  }

  get typeName(): string {
    return this.navigationService.getCurrentType();
  }

  get currentEnd(): string {
    return this.navigationService.getCurrentOther();
  }

  get shoudlDisplayEnd(): boolean {
    return true;
  }

  private onClickType(): void {
    this.navigationService.setCurrentType(this.typeName);
    this.router.navigate([Globals.getRoute(Globals.RECHERCHE)]);
  }

  private onClickGenre(): void {
    this.navigationService.setCurrentGenre(this.genreName);
    this.router.navigate([Globals.getRoute(Globals.RECHERCHE)]);
  }

  private onClickHome(): void {
    this.navigationService.setCurrentOther(Globals.HOME);
    this.router.navigate([Globals.getRoute(Globals.HOME)]);
  }

  private getDisplayable(str: string): string {
    return Globals.getDisplayableName(str);
  }
}
