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
  commandeAAfficher : Commande = new Commande();

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
    commande2.books = [{idBook:1,
      title:'D\'un monde à l\'autre', 
      author:'Pierre Bottero', 
      genre : 'FANTASY',
      type :"roman", 
      price:7.5, stock:10, 
      summary:"Quand Camille vit le poids lourd qui fonçait droit sur elle, elle se figea au milieu de la chaussée..."},
    
      {idBook:11,
      title:'Logique et fondements de l\'informatique', 
      author:'Richard Lassaigne, Michel de Rougemont', 
      genre : 'INFORMATIQUE',
      type :"manuel", 
      price:21.9, stock:10, 
      summary:"Cet ouvrage présente les principaux domaines de la logique qui contribuent aux fondements de l'informatique. Il est issu de plusieurs enseignements en mathématiques et informatique. Le premier tome est consacré à la logique du 1er ordre, la calculabilité et les fonctions récursives, le lambda-calcul et les systèmes de type pour les langages fonctionnels. Le second tome traitera de la définissabilité et de la théorie de la complexité. Il s'adresse aux étudiants de 2e et 3e cycles, ainsi qu'aux élèves ingénieurs intéressés par les liens nécessaires entre la logique et l'informatique. Des exercices placés en fin de chapitre facilitent l'évaluation des acquis. Dès lors cet ouvrage représente un véritable outil tant pratique que théorique."}
       


    ];
      
    commande2.date = "2017-12-19";
    commande2.idCmd = 2;
    commande2.items = [{idBook:1, quantity:1}, {idBook:11, quantity:2}];
    
    HistoriqueCommandesComponent.historique =[commande, commande2];
    // fin partie test en dur


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
    this.commandeAAfficher = commande;
    this.articles = this.recupererArticlesCommande(commande);
  }

  public recupererArticlesCommande(commande : Commande) : article[]{
    console.log("récupérer les articles de la commande : " + commande.date );
    let articles : article[] =[];
    let i = 0;
    while(i < commande.books.length){
      console.log("récupération du livre " + commande.books[i].title);
      articles[i] = new article();
      articles[i].book = new Livre();
      articles[i].book = commande.books[i];
      articles[i].idBook = commande.books[i].idBook;
      articles[i].quantity = this.getQuantity(commande, commande.books[i].idBook);
      i++;
    }
    return articles;
  }

  public getQuantity(commande: Commande, idBook : number) : number{

    console.log("récupération de la quantité du livre" + idBook + " de la commande : " + commande.date );
    let quantity : number;
    let i = 0;
    let trouve = false;
    while(!trouve && i < commande.items.length){
      if(commande.items[i].idBook == idBook){
        quantity = commande.items[i].quantity;
        trouve = true;
      }
      i++;
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
