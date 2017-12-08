import { Component, OnInit } from '@angular/core';
import { MenuRechercheComponent } from '../menu-recherche/menu-recherche.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  typeLivres: string[];

  constructor() { }

  private rechercher(type: string) {
    // MenuRechercheComponent.call(this).rechercher(type);
  }

  ngOnInit() {
    this.typeLivres = MenuRechercheComponent.typeLivres;
  }

}
