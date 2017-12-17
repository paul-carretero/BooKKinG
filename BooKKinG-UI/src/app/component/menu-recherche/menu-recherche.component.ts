import { RechercheService } from './../../service/recherche.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livre } from '../../model/livre';
import { PanierService } from '../../service/panier.service';
import { Globals } from '../../globals';
import { NavigationService } from '../../service/navigation.service';
import { TooltipDirective } from 'ng2-tooltip-directive/components';


@Component({
  selector: 'app-menu-recherche',
  templateUrl: './menu-recherche.component.html',
  styleUrls: ['./menu-recherche.component.css']
})

/**
 * Composant concernant la recherche par menus (de type)
 */
export class MenuRechercheComponent implements OnInit {

  constructor(private router: Router, private service: RechercheService, private servicePanier: PanierService,
    private navigationService: NavigationService) { }

  ngOnInit() { }

  private getSummarizedSummary(livre: Livre): string {
    let points = '';
    if (livre.summary.length > 168) {
      points = '...';
    }
    return livre.summary.substring(0, 168) + points;
  }

  private getDisplayable(str: string): string {
    return Globals.getDisplayableName(str);
  }


  private detailLivre(livre: Livre) {
    this.navigationService.setFromLivre(livre);
    this.router.navigate([Globals.getRoute(Globals.LIVRE), livre.idBook]);
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
