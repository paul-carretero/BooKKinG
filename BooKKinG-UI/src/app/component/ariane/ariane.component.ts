import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { Globals } from '../../globals';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { FiltreComponent } from '../filtre/filtre.component';

@Component({
  selector: 'app-ariane',
  templateUrl: './ariane.component.html',
  styleUrls: ['./ariane.component.css']
})
export class ArianeComponent implements OnInit {

  private static myInstance: ArianeComponent;

  private typeName: string = null;

  private genreName: string = null;

  private currentEnd: string = null;

  public static getInstance(): ArianeComponent {
    return ArianeComponent.myInstance;
  }

  constructor() {
    ArianeComponent.myInstance = this;
  }

  ngOnInit() { }

  public setOther(other: string): void {
    this.typeName = null;
    this.genreName = null;
    this.currentEnd = null;
    if (other !== '') {
      this.currentEnd = other;
    }
  }

  private onClickType(): void {
    HeaderComponent.getInstance().setCurrent(this.typeName, true);
    this.genreName = null;
    this.currentEnd = null;
  }

  private onClickGenre(): void {
    FiltreComponent.getInstance().setCurrentGenre(this.genreName, true);
    this.currentEnd = null;
  }

  private onClickHome(): void {
    this.typeName = null;
    this.genreName = null;
    this.currentEnd = null;
    HeaderComponent.getInstance().setCurrent('HOME', false);
  }

  public setTypeName(newType: string): void {
    this.typeName = newType;
    this.currentEnd = null;
    if (this.typeName === 'NONE') {
      this.typeName = null;
    }
  }

  public setGenreName(newGenre: string): void {
    this.genreName = newGenre;
    this.currentEnd = null;
  }

  public setLivre(livre: Livre): void {
    this.currentEnd = livre.title;
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
