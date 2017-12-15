import { NavPage } from './../../nav-page.enum';
import { HistoriquePagesService } from './../../service/historique-pages.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-button',
  templateUrl: './return-button.component.html',
  styleUrls: ['./return-button.component.css']
})
export class ReturnButtonComponent implements OnInit {

  constructor(private router: Router, private histoNav: HistoriquePagesService) { }

  ngOnInit() {
  }

  public returnPagePreced() {
    const navPage = this.histoNav.navPagePrecedante();
    switch (navPage) {
      case NavPage.COMPTE.toFixed(0): this.router.navigate(['compte']);
        break;
      case NavPage.LOGIN.toFixed(0): this.router.navigate(['identification-inscription']);
        break;
      case NavPage.PANIER.toFixed(0): this.router.navigate(['panier']);
        break;
      case NavPage.RECHERCHE.toFixed(0): this.router.navigate(['menu-recherche']);
        break;
      default:
        break;
    }
  }

}
