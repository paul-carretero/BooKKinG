import { Component, OnInit, OnDestroy } from '@angular/core';
import { Livre } from '../../model/livre';
import { ActivatedRoute } from '@angular/router';
import { LivreService } from './../../service/livre.service';
import { PanierService } from '../../service/panier.service';
import { NavigationService } from '../../service/navigation.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { TooltipDirective } from 'ng2-tooltip-directive/components';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit, OnDestroy {

  private idLivre: number;

  private sub: Subscription;

  private nbLivre = 1;

  constructor(private route: ActivatedRoute, private service: LivreService, private servicePanier: PanierService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.service.updateLivreId(Number(params['id']));
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get livre(): Livre {
    return this.service.getLivre();
  }

  private getTotalPrice(): string {
    return (this.livre.price * this.nbLivre).toFixed(2);
  }

  /**
    * Méthode demandant l'ajout d'un livre au panier
    * @param livre livre à ajouter au panier
    */
  private ajouterAuPanier(livre: Livre) {
    this.servicePanier.ajouterLivrePanier(livre, this.nbLivre);
  }

  private setNbLivre(nb: string) {
    this.nbLivre = Number(nb);
    if (this.nbLivre < 1) {
      this.nbLivre = 1;
    }
  }
}
