import { Globals } from './../globals';
import { NavigationData } from './../model/navigation-data';
import { Injectable } from '@angular/core';
import { NavigationService } from './navigation.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class HistoriquePagesService {

  private static readonly MAX_HISTORY = 100;

  private histoPages: NavigationData[];

  private count = 0;

  constructor(private navServ: NavigationService) {
    this.histoPages = [];
    this.subNav();
  }

  private subNav() {
    this.navServ.suscribeForNavEvent().subscribe(
      current => {
        if (this.histoPages.length > HistoriquePagesService.MAX_HISTORY) {
          this.histoPages.shift();
        }
        this.histoPages.push(current);
        this.count++;
      }
    );
  }

  public canGoBack(): boolean {
    return this.count > 0;
  }

  public navPagePrecedente(): NavigationData {
    let pagePrec: NavigationData = this.histoPages.pop();
    while (this.histoPages.length > 0 && this.navServ.getCurrentNavData().equals(pagePrec)) {
      pagePrec = this.histoPages.pop();
    }
    this.navServ.setCurrent(pagePrec);
    this.count--;
    this.count--;
    return pagePrec;
  }
}
