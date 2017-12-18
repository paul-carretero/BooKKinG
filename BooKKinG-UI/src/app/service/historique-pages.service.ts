import { Globals } from './../globals';
import { NavigationData } from './../model/navigation-data';
import { Injectable } from '@angular/core';
import { NavigationService } from './navigation.service';
import { Router } from '@angular/router';

@Injectable()
export class HistoriquePagesService {

  private static readonly MAX_HISTORY = 100;

  private readonly histoPages: NavigationData[];

  private count = 0;

  constructor(private navServ: NavigationService) {
    this.histoPages = [this.cloneNavData(this.navServ.getCurrentNavData())];
    this.subNav();
  }

  private subNav() {
    this.navServ.suscribeForNavEvent().subscribe(
      current => {
        if (this.histoPages.length > HistoriquePagesService.MAX_HISTORY) {
          this.histoPages.shift();
        }
        this.histoPages.push(this.cloneNavData(current));
        this.count++;
      }
    );
  }

  private cloneNavData(o: NavigationData): NavigationData {
    const res = new NavigationData();
    res.genre = o.genre;
    res.livre = o.livre;
    res.nPage = o.nPage;
    res.other = o.other;
    res.search = o.search;
    res.type = o.type;
    return res;
  }

  public canGoBack(): boolean {
    return this.count > 0 && this.histoPages.length > 0;
  }

  public navPagePrecedente(): NavigationData {
    const c = this.cloneNavData(this.navServ.getCurrentNavData());
    let pagePrec: NavigationData = this.histoPages.pop();
    while (this.histoPages.length > 0 && (c.equals(pagePrec) || Globals.transactionPage.includes(pagePrec.other))) {
      pagePrec = this.histoPages.pop();
      this.count--;
    }
    this.navServ.setCurrent(pagePrec);
    this.count--;
    this.count = Math.max(0, this.count);
    return pagePrec;
  }
}
