import { Globals } from './../globals';
import { NavigationData } from './../model/navigation-data';
import { Injectable } from '@angular/core';
import { NavigationService } from './navigation.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class HistoriquePagesService {

  private static MAX_HISTORY = 10;

  private histoPages: NavigationData[];

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
      }
    );
  }

  public canGoBack(): boolean {
    return this.histoPages.length > 0;
  }

  public navPagePrecedante(): NavigationData {
    let pagePrec: NavigationData = this.histoPages.pop();
    while (pagePrec.equals(this.navServ.getCurrentNavData())) {
      pagePrec = this.histoPages.pop();
    }
    this.navServ.setCurrent(pagePrec, true);
    return pagePrec;
  }
}
