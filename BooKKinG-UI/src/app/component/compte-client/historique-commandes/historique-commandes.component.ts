import { Article } from './../../../model/article';
import { Commande } from './../../../model/commande';
import { Component, OnInit } from '@angular/core';
import { Livre } from '../../../model/livre';
import { AchatService } from '../../../service/achat.service';
import { SimpleArticle } from '../../../model/simple-article';
import { AbstractComponent } from '../../abstract-component';
import { Router } from '@angular/router';
import { NavigationService } from '../../../service/navigation.service';

@Component({
  selector: 'app-historique-commandes',
  templateUrl: './historique-commandes.component.html',
  styleUrls: ['./historique-commandes.component.css']
})
export class HistoriqueCommandesComponent extends AbstractComponent implements OnInit {

  public articles: Article[];
  public commandeSelected = false;
  public commandeAAfficher: Commande;


  constructor(private serviceCommande: AchatService, public router: Router, public navigationService: NavigationService) {
    super(router, navigationService);
    this.commandeAAfficher = new Commande();
  }

  ngOnInit() {
    this.commandeSelected = false;
  }

  get historique(): Commande[] {
    return this.serviceCommande.getCommandesClient();
  }

  public afficherDetailsCommande(commande: Commande) {
    this.commandeSelected = true;
    this.commandeAAfficher = commande;
    this.articles = this.serviceCommande.recupererArticlesCommande(commande);
  }
}
