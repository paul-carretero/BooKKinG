import { ConnectionComponent } from './../../composant/connection/connection.component';
import { PanierComponent } from './../panier/panier.component';
import { RechercheService } from './../../service/recherche.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livre } from '../../model/livre';
import { Recherche } from '../../model/recherche';
import { LivreComponent } from '../livre/livre.component';
import { rootRoute } from '@angular/router/src/router_module';
import { RouterOutlet } from '@angular/router/src/directives/router_outlet';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { PanierService } from '../../service/panier.service';
import { HeaderComponent } from '../header/header.component';
import { FiltreComponent } from '../filtre/filtre.component';
import { Notifiable } from '../../itf/notifiable';
import { ArianeComponent } from '../ariane/ariane.component';
import { SimpleArticle } from '../../model/simple-article';

@Component({
  selector: 'app-menu-recherche',
  templateUrl: './menu-recherche.component.html',
  styleUrls: ['./menu-recherche.component.css']
})

/**
 * Composant concernant la recherche par menus (de type)
 */
export class MenuRechercheComponent implements OnInit, Notifiable {

  private static myInstance: Notifiable = null;

  private static shouldUpdateOnInit = false;

  /**
   * Liste des livres qui correspondent au menu séléctionné
   */
  private listeLivres: Livre[] = [];

  /**
   * Attribut contenant les informations concernant la recherche de livre
   */
  private recherche: Recherche = new Recherche();

  public static getInstance(): Notifiable {
    if (MenuRechercheComponent.myInstance != null) {
      MenuRechercheComponent.shouldUpdateOnInit = false;
      return MenuRechercheComponent.myInstance;
    } else {
      MenuRechercheComponent.shouldUpdateOnInit = true;
    }
  }

  constructor(private router: Router, private service: RechercheService, private servicePanier: PanierService) { }

  ngOnInit() {
    MenuRechercheComponent.myInstance = this;
    if (MenuRechercheComponent.shouldUpdateOnInit) {
      MenuRechercheComponent.shouldUpdateOnInit = false;
      this.notify();
    }
  }

  notify(): void {
    console.log('notified');
    this.recherche.type = HeaderComponent.getInstance().getCurrentType();
    this.recherche.anySearch = HeaderComponent.getInstance().getAnySearch();
    this.recherche.genre = FiltreComponent.getInstance().getCurrentGenre();
    this.recherche.maxPrice = FiltreComponent.getInstance().getMaxPrice();
    this.recherche.minPrice = FiltreComponent.getInstance().getMinPrice();
    this.rechercher();
    ArianeComponent.getInstance().setTypeName(this.recherche.type);
    ArianeComponent.getInstance().setGenreName(this.recherche.genre);
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
    console.log('livre : ' + livre.title + ' à ajouter au panier');
    PanierComponent.ajouterLivrePanier(livre, 1);
    if (ConnectionComponent.clientConnecte) {
      const articleSimple: SimpleArticle = new SimpleArticle();
      articleSimple.idBook = livre.idBook;
      articleSimple.quantity = 1;
      this.servicePanier.miseAJourQuantiteLivre(articleSimple).subscribe(
        reponse => {
          console.log('résultat de la mise à jour du panier : ' + reponse.success);
        }
      );
    }

  }

  public rechercher() {
    console.log('header' + HeaderComponent.getInstance().getCurrentType());
    console.log(this.recherche.type);
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
        }
      }
    );
  }
}

