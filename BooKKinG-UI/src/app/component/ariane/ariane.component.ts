import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { Globals } from '../../globals';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { FiltreComponent } from '../filtre/filtre.component';
import { NavigationService } from '../../service/navigation.service';

@Component({
  selector: 'app-ariane',
  templateUrl: './ariane.component.html',
  styleUrls: ['./ariane.component.css']
})
export class ArianeComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

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
  }

  private onClickGenre(): void {
    this.navigationService.setCurrentGenre(this.genreName);
  }

  private onClickHome(): void {
    this.navigationService.setCurrentOther('HOME');
  }

  private getDisplayable(str: string): string {
    return Globals.getDisplayableName(str);
  }
}
