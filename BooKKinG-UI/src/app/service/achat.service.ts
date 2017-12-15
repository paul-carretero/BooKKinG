import { Commande } from './../model/commande';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { Article } from '../model/article';
import { Livre } from '../model/livre';


@Injectable()
export class AchatService {

  private commandesClient : Commande[];
  private commandeCourante : Commande = null;

  urlAchat = `http://` + Globals.host + `/BooKKinG-Server-web/Command`;



  constructor(private http: Http) {
    this.commandesClient = [];
    this.commandeCourante = new Commande();
   }

   public getCommandesClient(){
     return this.commandesClient;
   }

   public getCommandeCourante(){
     return this.commandeCourante;
   }


   
   /*--------    Fonctions pour traiter des commandes      --------- */
   public recupererArticlesCommande(commande: Commande): Article[] {
    const articles: Article[] = [];
    let i = 0;
    while (i < commande.books.length) {
      articles[i] = new Article();
      articles[i].book = new Livre();
      articles[i].book = commande.books[i];
      articles[i].idBook = commande.books[i].idBook;
      articles[i].quantity = this.getQuantity(commande, commande.books[i].idBook);
      i++;
    }
    return articles;
  }

  public getQuantity(commande: Commande, idBook: number): number {
     let quantity: number;
     let i = 0;
     let trouve = false;
     while (!trouve && i < commande.items.length) {
       if (commande.items[i].idBook === idBook) {
         quantity = commande.items[i].quantity;
         trouve = true;
       }
       i++;
     }
     return quantity;
   }


   public getMontantTotalCommande(commande : Commande){
    let articlesCommande : Article[];
    articlesCommande = this.recupererArticlesCommande(commande);
    let total = 0;
    articlesCommande.forEach(
      article =>{
        total = total + (article.book.price * 100 * this.getQuantity(commande, article.book.idBook));
      }
    );
    return total / 100;

  }

  public calculMontantDesCommandes(){
    this.commandesClient.forEach(
      commande =>{
        commande.total = this.getMontantTotalCommande(commande) + commande.shippingCost;
      }
    );
  }

 
  





   /* ------ Fonctions de communication avec le serveur -------- */
  public enregistrerCommande(adresseLivraison : string): Observable<any> {
    console.log('dans enregistrement commande');
    let json = {address:adresseLivraison}; 
    const reponse = this.http.post(this.urlAchat, json, { withCredentials: true })
      .map(res => res.json());
    return reponse;
  }


public recupererCommandes(){
  console.log('dans recupérer des commandes');
  const reponse = this.http.get(this.urlAchat, { withCredentials: true })
    .map(res => res.json()).subscribe(
      commandes => {
        if(commandes.success){
          console.log("récupération des commandes réussie");
          this.commandesClient = commandes.commands;
          this.calculMontantDesCommandes();
        }
        else{
          console.log(commandes.message);
        }
      }
    );
  }

  

}
