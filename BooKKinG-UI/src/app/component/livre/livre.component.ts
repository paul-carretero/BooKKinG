import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { PanierComponent } from '../panier/panier.component';
import { ActivatedRoute } from '@angular/router';
import { LivreService } from './../../service/livre.service';
import { ArianeComponent } from '../ariane/ariane.component';
import { HeaderComponent } from '../header/header.component';
import { FiltreComponent } from '../filtre/filtre.component';
import { PanierService } from '../../service/panier.service';
import { NavigationService } from '../../service/navigation.service';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit {

  private idLivre: number;

  private sub: any;

  private livre: Livre;

  private nbLivre = 1;

  constructor(private route: ActivatedRoute, private service: LivreService, private servicePanier: PanierService,
    private navigationService: NavigationService) {
    this.livre = {
      title: 'loading',
      author: 'loading',
      genre: 'loading',
      type: 'loading',
      price: 0,
      stock: 0,
      summary: 'loading'
    };
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idLivre = Number(params['id']);
      this.service.rechercherLivre(this.idLivre).subscribe(
        reponse => {
          if (reponse.success) {
            this.livre = reponse;
            this.navigationService.setFromLivre(this.livre);
          }
        }
      );
    });
  }

  private getTotalPrice(): string {
    return (this.livre.price * this.nbLivre).toFixed(2);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
    * Méthode demandant l'ajout d'un livre au panier
    * @param livre livre à ajouter au panier
    */
  public ajouterAuPanier(livre: Livre) {
    console.log('livre : ' + livre.title + ' à ajouter au panier');
    this.servicePanier.ajouterLivrePanier(livre, this.nbLivre);
  }

  public setNbLivre(nb: any) {
    this.nbLivre = Number(nb.target.value);
  }

}
