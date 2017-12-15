import { Globals } from './../globals';
import { NavigationData } from './../model/navigation-data';
import { Injectable } from '@angular/core';
import { NavigationService } from './navigation.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class HistoriquePagesService {

  private histoPages: NavigationData[];

  constructor(private navServ: NavigationService) {
    this.subNav();
    this.histoPages = [];
   }

   private subNav() {
     this.navServ.suscribeForNavEvent().subscribe(
       current => { this.histoPages.push(current); }
     );
   }

   public navPagePrecedante(): string {
     const pagePrec: NavigationData = this.histoPages.pop();
     this.navServ.setCurrent(pagePrec);
     return pagePrec.other;
   }

}
