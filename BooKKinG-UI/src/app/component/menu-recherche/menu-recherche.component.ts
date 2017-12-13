import { RechercheService } from './../../service/recherche.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Livre } from '../../model/livre';
import { PanierService } from '../../service/panier.service';

@Component({
  selector: 'app-menu-recherche',
  templateUrl: './menu-recherche.component.html',
  styleUrls: ['./menu-recherche.component.css']
})

/**
 * Composant concernant la recherche par menus (de type)
 */
export class MenuRechercheComponent implements OnInit {

  constructor(private router: Router, private service: RechercheService, private servicePanier: PanierService) { }

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
  public ajouterAuPanier(livre: Livre) {
    this.servicePanier.ajouterLivrePanier(livre, 1);
  }

  get listeLivres(): Livre[] {
    return this.service.getLastLivreList();
  }
}
