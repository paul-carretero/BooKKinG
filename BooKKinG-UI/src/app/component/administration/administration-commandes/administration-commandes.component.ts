import { AchatService } from './../../../service/achat.service';
import { Component, OnInit } from '@angular/core';
import { Commande } from '../../../model/commande';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Article } from '../../../model/article';

@Component({
  selector: 'app-administration-commandes',
  templateUrl: './administration-commandes.component.html',
  styleUrls: ['./administration-commandes.component.css']
})
export class AdministrationCommandesComponent implements OnInit {

  public datesForm: FormGroup;

  public currentCmd: Commande;

  public articles: Article[] = [];

  constructor(private serviceAchat: AchatService, private fb: FormBuilder) {
    this.datesForm = fb.group({
      dStart: [''], dEnd: ['']
    });
  }

  ngOnInit() {
    this.serviceAchat.récupérerAllCommandes('', '');
  }

  get allCommandes(): Commande[] {
    return this.serviceAchat.getAllCommandes();
  }

  public montantTotal(commande): number {
    return this.serviceAchat.getMontantTotalCommande(commande);
  }

  public rechercherCommandes() {
    const dStart = this.datesForm.value.dStart;
    const dEnd = this.datesForm.value.dEnd;
    this.serviceAchat.récupérerAllCommandes(dStart, dEnd);
  }

  public setCurrentCommande(c: Commande) {
    this.currentCmd = c;
    this.articles = this.serviceAchat.recupererArticlesCommande(this.currentCmd);
  }

  public getDisplayPrice(n: number): string {
    return n.toFixed(2);
  }
}
