import { HistoriquePagesService } from './../../../service/historique-pages.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../service/navigation.service';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-return-button',
  templateUrl: './return-button.component.html',
  styleUrls: ['./return-button.component.css']
})
export class ReturnButtonComponent implements OnInit {

  constructor(private router: Router, private histoNav: HistoriquePagesService, private navService: NavigationService) { }

  ngOnInit() {
  }

  private get canGoBack(): boolean {
    return this.histoNav.canGoBack();
  }

  public returnPrevPage() {
    if (this.canGoBack) {
      const navPage = this.histoNav.navPagePrecedente();
      if (this.canGoBack) {
        if (navPage.livre) {
          this.router.navigate([navPage.other + '/' + navPage.livre.idBook.toString()]);
        } else {
          this.router.navigate([Globals.getRoute(navPage.other)]);
        }
      }
    }
  }
}
