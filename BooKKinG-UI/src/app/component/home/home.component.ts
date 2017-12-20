import { Component, OnInit, OnDestroy } from '@angular/core';
import { InitService } from '../../service/init.service';
import { Livre } from '../../model/livre';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationService } from '../../service/navigation.service';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { AbstractComponent } from '../abstract-component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AbstractComponent implements OnInit, OnDestroy {

  private static readonly displayTime = 2000;

  private static current = 0;

  private static readonly options = ['Nouveauté', 'Best-Seller', 'Suggestion'];

  private interval: any;

  /**
  * Constructeur du composant home
  * @param routeur permet de gérer le routage
  * @param service permet d'accéder aux services du composant NavigationService
  * @param init permet d'accéder aux services du composant InitService
  */

  constructor(private init: InitService, public router: Router, public navigationService: NavigationService) {
    super(router, navigationService);
  }

  ngOnInit() {
    this.interval = setInterval(this.next, HomeComponent.displayTime);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
  /**
  * Entrer le souris dans la zone d'affichage d'un offre de livre à l'accueil
  * @param :rien
  * @return: rien
  */
  public onMouseEnter(): void {
    clearInterval(this.interval);
  }
  /**
  * Le souris quitte la zone d'affichage d'un offre de livre à l'accueil
  * @param :rien
  * @return: rien
  */
  public onMouseLeave(): void {
    this.interval = setInterval(this.next, HomeComponent.displayTime);
  }

  public setCurrent(n: number): void {
    HomeComponent.current = n;
  }

  public isActiveClass(n: number): string {
    if (HomeComponent.current === n) {
      return 'active';
    }
    return '';
  }
  /**
  * Incrémenter l'indice 'current' ou le remet à 0 (pour basculer les offres du livres qui sont affichés à l'accueil)
  * @param :rien
  * @return: rien
  */
  private next(): void {
    if (HomeComponent.current < (HomeComponent.options.length - 1)) {
      HomeComponent.current++;
    } else {
      HomeComponent.current = 0;
    }
  }

  get currentOption(): string {
    return HomeComponent.options[HomeComponent.current];
  }
  /**
  * Récupérer le livre souhaité qui est affiché à l'accueil (soit le livre le plus acheté, soit le plus nouveau) 
  * @param :rien
  * @return: un livre
  */
  get currentBook(): Livre {
    switch (HomeComponent.current) {
      case 0: {
        return this.init.getNewestBook() || new Livre();
      }
      case 1: {
        return this.init.getMostBuyBook() || new Livre();
      }
      default: {
        return this.init.getRandomBook() || new Livre();
      }
    }
  }
  /**
  * Aller voir le détail du livre (l'offre affiché à l'accueil du site)
  * @param :rien
  * @return: rien
  */
  public goToBook(): void {
    if (this.currentBook) {
      this.detailLivre(this.currentBook);
    }
  }
  /**
  * Récupérer le résumé du livre
  * @param :rien
  * @return: retourne une chaine vide si le livre n'a pas de de texte de résumé,
  * sinon retourne le texte du résumé (si la taille du texte > 250 caractères,
  * le textex va concaténer avec les trois petits points )
  */
  public getSummarizedSummary(): string {
    if (!this.currentBook.summary) {
      return '';
    }
    let points = '';
    if (this.currentBook.summary.length > 256) {
      points = '...';
    }
    return this.currentBook.summary.substring(0, 256) + points;
  }
}
