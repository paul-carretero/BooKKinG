import { RechercheService } from './../../service/recherche.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livre } from '../../model/livre';
import { PanierService } from '../../service/panier.service';
import { Globals } from '../../globals';
import { NavigationService } from '../../service/navigation.service';
import { TooltipDirective } from 'ng2-tooltip-directive/components';
import { AbstractComponent } from '../abstract-component';


@Component({
  selector: 'app-menu-recherche',
  templateUrl: './menu-recherche.component.html',
  styleUrls: ['./menu-recherche.component.css']
})

/**
 * Composant concernant la recherche par menus (de type)
 */
export class MenuRechercheComponent extends AbstractComponent implements OnInit {

  constructor(public router: Router, private service: RechercheService, private servicePanier: PanierService,
    public navigationService: NavigationService) {
    super(router, navigationService);
  }

  ngOnInit() { }

  private getSummarizedSummary(livre: Livre): string {
    let points = '';
    if (livre.summary.length > 168) {
      points = '...';
    }
    return livre.summary.substring(0, 168) + points;
  }

  /**
  * Méthode demandant l'ajout d'un livre au panier
  * @param livre livre à ajouter au panier
  */
  private ajouterAuPanier(livre: Livre) {
    this.servicePanier.ajouterLivrePanier(livre, 1);
  }

  get listeLivres(): Livre[] {
    return this.service.getLastLivreList();
  }
}
