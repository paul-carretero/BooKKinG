import { HistoriquePagesService } from './../../../service/historique-pages.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../service/navigation.service';
import { Globals } from '../../../globals';
import { AchatService } from '../../../service/achat.service';

@Component({
  selector: 'app-return-button',
  templateUrl: './return-button.component.html',
  styleUrls: ['./return-button.component.css']
})
export class ReturnButtonComponent implements OnInit {

  constructor(private router: Router, private histoNav: HistoriquePagesService,
    private navService: NavigationService, private achatService: AchatService) { }

  ngOnInit() {
  }

  private get canGoBack(): boolean {
    return this.histoNav.canGoBack();
  }

  get shouldHide(): boolean {
    return this.achatService.getTransactionState();
  }

  private returnPrevPage() {
    if (this.canGoBack) {
      const navPage = this.histoNav.navPagePrecedente();
      if (navPage) {
        if (navPage.livre) {
          this.router.navigate([Globals.getRoute(Globals.LIVRE), navPage.livre.idBook]);
        } else {
          this.router.navigate([Globals.getRoute(navPage.other)]);
        }
      }
    }
  }
}
