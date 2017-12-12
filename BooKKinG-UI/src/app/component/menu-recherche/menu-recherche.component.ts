import { RechercheService } from './../../service/recherche.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livre } from '../../model/livre';
import { Recherche } from '../../model/recherche';
import { rootRoute } from '@angular/router/src/router_module';
import { RouterOutlet } from '@angular/router/src/directives/router_outlet';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { PanierService } from '../../service/panier.service';
import { Notifiable } from '../../itf/notifiable';
import { SimpleArticle } from '../../model/simple-article';
import { NavigationService } from '../../service/navigation.service';
import { Globals } from '../../globals';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-menu-recherche',
  templateUrl: './menu-recherche.component.html',
  styleUrls: ['./menu-recherche.component.css']
})

/**
 * Composant concernant la recherche par menus (de type)
 */
export class MenuRechercheComponent implements OnInit, OnDestroy, Notifiable {

  private static updateOnStartUp = true;

  /**
   * Liste des livres qui correspondent au menu séléctionné
   */
  private listeLivres: Livre[] = [];

  /**
   * Attribut contenant les informations concernant la recherche de livre
   */
  private recherche: Recherche;

  constructor(private router: Router, private service: RechercheService, private servicePanier: PanierService,
    private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigationService.subscribeForNotify(this);
    this.service.subscribeForNotify(this);
    if (MenuRechercheComponent.updateOnStartUp) {
      MenuRechercheComponent.updateOnStartUp = false;
      this.notify();
    }
  }

  ngOnDestroy() {
    this.navigationService.unSubscribe(this);
    this.service.unSubscribe(this);
  }

  notify(): void {
    this.recherche = new Recherche();

    this.recherche.type = this.navigationService.getCurrentType();
    this.recherche.genre = this.navigationService.getCurrentGenre();

    this.recherche.anySearch = this.service.getCurrentSearch();
    this.recherche.maxPrice = this.service.getMaxPrice();
    this.recherche.minPrice = this.service.getMinPrice();

    this.rechercher();
  }

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

  public rechercher() {
    this.listeLivres = [];
    this.service.rechercherEnsembleLivre(this.recherche).subscribe(
      reponse => {
        console.log('rechercherEnsembleLivre');
        // si la recherche a réussie
        if (reponse.success) {
          let i = 0;
          // chaque livre récupéré dans la base de donnée est ajouté à la liste des livres à afficher
          reponse.books.forEach(
            livre => {
              this.listeLivres[i] = livre;
              i++;
            }
          );
        } else {
          alert(reponse.message);
        }
      }
    );
  }
}

