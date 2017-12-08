import { article } from './../panier/panier.component';
import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { SimpleArticle } from '../../service/panier.service';
import { AchatService } from '../../service/achat.service';

@Component({
  selector: 'app-historique-commandes',
  templateUrl: './historique-commandes.component.html',
  styleUrls: ['./historique-commandes.component.css']
})
export class HistoriqueCommandesComponent implements OnInit {

  static historique : Commande[] = [];
 
  articles : article[];


  commandeSelected : boolean = false;

  constructor(private serviceCommande : AchatService) { }

  ngOnInit() {
    this.commandeSelected = false;


    // code en dur
    let commande = new Commande();
    commande.books = [{idBook:0,
     title:'Etiquette et espionnage', 
     author:'Gail Carriger', 
     genre : 'POLICIER',
     type :"roman", 
     price:7, stock:10, 
     summary:"Angleterre, début du XIXe siècle. Sophronia, 14 ans, est un défi permanent pour sa mère : elle préfère démonter les horloges et grimper aux arbres plutôt qu'apprendre les bonnes manières ! Mme Temminnick désespère que sa fille devienne jamais une parfaite lady, aussi l'inscrit-elle au Pensionnat de Mlle Géraldine qui s'attache au perfectionnement des jeunes dames de qualité. Très vite, Sophronia comprend que cette école ne correspond pas exactement à l'idée que sa mère s'en faisait. Certes, les jeunes filles y apprennent l'étiquette, mais aussi celui de la diversion, de l'espionnage et de l'acte de donner la mort - tout cela de la manière la plus civilisée possible, bien sûr. C'est une chose d'apprendre à faire une révérence comme il faut, c'en est une autre d'apprendre à la faire en lançant un couteau... "}];
    
    commande.date = "2017-11-19";
    commande.idCmd = 1;
    commande.items = [{idBook:0, quantity:3}];




    let commande2 = new Commande();
    commande2.books = [{idBook:0,
     title:'Etiquette et espionnage', 
     author:'Gail Carriger', 
     genre : 'POLICIER',
     type :"roman", 
     price:7, stock:10, 
     summary:"Angleterre, début du XIXe siècle. Sophronia, 14 ans, est un défi permanent pour sa mère : elle préfère démonter les horloges et grimper aux arbres plutôt qu'apprendre les bonnes manières ! Mme Temminnick désespère que sa fille devienne jamais une parfaite lady, aussi l'inscrit-elle au Pensionnat de Mlle Géraldine qui s'attache au perfectionnement des jeunes dames de qualité. Très vite, Sophronia comprend que cette école ne correspond pas exactement à l'idée que sa mère s'en faisait. Certes, les jeunes filles y apprennent l'étiquette, mais aussi celui de la diversion, de l'espionnage et de l'acte de donner la mort - tout cela de la manière la plus civilisée possible, bien sûr. C'est une chose d'apprendre à faire une révérence comme il faut, c'en est une autre d'apprendre à la faire en lançant un couteau... "}];
    
    commande2.date = "2017-12-19";
    commande2.idCmd = 2;
    commande2.items = [{idBook:0, quantity:3}];
    
    HistoriqueCommandesComponent.historique =[commande, commande2];
    // partie communiquant avec le serveur
    /*
    this.serviceCommande.recupererCommandes().subscribe(
      commandes => {
        if(commandes.success){
          console.log("récupération des commandes réussie");
          HistoriqueCommandesComponent.historique = commandes;
         // this.historique = commandes;
        }
        else{
          console.log(commandes.message);
        }
      }
    );
    */
  }

  get historique(){return HistoriqueCommandesComponent.historique;}


  public afficherDetailsCommande(commande : Commande){
    console.log("afficher les détails de la commande : " + commande.date );
    this.commandeSelected = true;
    this.articles = this.recupererArticlesCommande(commande);
  }

  public recupererArticlesCommande(commande : Commande) : article[]{
    let articles : article[] =[];
    let i = 0;
    while(i < commande.books.length){
      articles[i] = new article();
      articles[i].book = commande.books[0];
      articles[i].idBook = commande.books[0].idBook;
      articles[i].quantity = this.getQuantity(commande, commande.books[0].idBook);
    }
    return articles;
  }

  public getQuantity(commande: Commande, idBook : number) : number{
    let quantity : number;
    let i = 0;
    let trouve = false;
    while(!trouve && i < commande.items.length){
      if(commande.items[i].idBook == idBook){
        quantity = commande.items[i].quantity;
        trouve = true;
      }
    }
    return quantity;
  }

}

export class Commande{
  date : string ;//date de la commande
  idCmd: number ;//id de la commande
  books : Livre[] ;//tableau des livre de la commande 
  items: SimpleArticle[] ;//tableau associant l'id d'un livre de la commande à sa quantité
  success: boolean ;//true
  message: string ;//unused
}
