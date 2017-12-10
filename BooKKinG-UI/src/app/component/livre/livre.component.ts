import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { PanierComponent } from '../panier/panier.component';
import { ActivatedRoute } from '@angular/router';
import { LivreService } from './../../service/livre.service';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit {

  private idLivre: number;

  private sub: any;

  livre: Livre;

  nbLivre = 1;

  constructor(private route: ActivatedRoute, private service: LivreService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idLivre = Number(params['id']);
      this.service.rechercherLivre(this.idLivre).subscribe(
        reponse => {
          if (reponse.success) {
            this.livre = reponse;
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
   public ajouterAuPanier(livre : Livre) {
    console.log("livre : " + livre.title + " à ajouter au panier");
    PanierComponent.ajouterLivrePanier(livre, this.nbLivre);
   }

   public setNbLivre(nb: any) {
      this.nbLivre = nb.target.value;
   }

}
