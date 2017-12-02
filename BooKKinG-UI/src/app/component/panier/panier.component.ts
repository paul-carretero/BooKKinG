import { ConnectionComponent } from './../../composant/connection/connection.component';
import { Livre } from './../../model/livre';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Router } from '@angular/router';
import { PayerComponent } from '../payer/payer.component';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})

/**
 * Composant correspondant au panier
 */
export class PanierComponent implements OnInit {
 
  /**
   * Montant total des livres contenus dans le panier
   */
  static montantTotal : number = 0.0;

  /**
   * Tableau de livre dynamique permettant l'affichage dans le html
   */
 
  contenuPanier : article[] = [];
  static contenuPanier : article[] = [];

  /**
   *  nombre dynamique permettant l'affcichage le montant total
   */
  montantTotal : number = 0.0;


  constructor(private router : Router) { }


  ngOnInit() { 
    this.contenuPanier = PanierComponent.contenuPanier;
   // this.listeLivre = PanierComponent.tabLivre; 
    this.montantTotal = PanierComponent.montantTotal;
    //this.getContenuPanier();
    
  }


  public supprimer(idBook : number){
    let trouve = false;
    let i = 0;
    while(!trouve && i < PanierComponent.contenuPanier.length){
      if(idBook == PanierComponent.contenuPanier[i].idBook){
        PanierComponent.contenuPanier.splice(i,1);
        trouve = true;
      }
      i++;
    }
    this.contenuPanier = PanierComponent.contenuPanier;
  }


  /**
   * Méthode permettant d'ajouter un livre au panier
   * @param livre livre à ajouter au panier
   */
  public static ajouterLivrePanier(livre : Livre){
    console.log("dans ajouter Livre au panier");
    console.log("livre a ajouter : " + livre.title);
 

    let i : number = 0;
    let ajoute : boolean = false;
    while(!ajoute && i < PanierComponent.contenuPanier.length){
      if(livre.idBook == PanierComponent.contenuPanier[i].idBook){
        PanierComponent.contenuPanier[i].quantity++;
        ajoute = true;
      }
      i++;
    }
    if(!ajoute){
      PanierComponent.contenuPanier[i] = { book:livre, quantity:1, idBook: livre.idBook };
    }

    this.montantTotal = this.total() ;
   }
    
  /**
  * Méthode permettant de calculer le montant total des articles dans le panier
  */
  public static total(){
    console.log("dans payer");
    let montant : number = 0;   
    PanierComponent.contenuPanier.forEach(
      article => {
        montant = montant + (article.book.price * 100) * article.quantity;  
      }
    );

    return  montant/100;
  }

  /**
  * Méthode appelée pour démarrer le processus de paiement
  */
  public payer(){
    console.log("dans payer du panier");  
    // si le client est connecté alors on peut démarrer le processus de paiement 
    if(ConnectionComponent.clientConnecte){
      PayerComponent.enCoursDePaiement = true; 
      this.router.navigate(['livraison']);      
    } 
    // sinon, l'utilisateur doit se connecter
    else{
      PayerComponent.enCoursDePaiement = true; 
      this.router.navigate(['/connection']);
    }
  }

  /**
   * Méthode pour vider le panier
   */
  public viderPanier(){
    console.log("dans vider panier");
   // this.listeLivre = PanierComponent.tabLivre = [];
    this.montantTotal =  PanierComponent.montantTotal = 0;
    this.contenuPanier = PanierComponent.contenuPanier = [];
  }

 
  public set(livre : Livre, quantity : any){
    console.log("dans set");
    console.log("livre : " + livre.title);
    console.log("quantity : " + quantity.target.value);
    
    let i : number = 0;
    let set : boolean = false;

    while(!set && i < PanierComponent.contenuPanier.length){
      if(livre.idBook == PanierComponent.contenuPanier[i].idBook){
        PanierComponent.contenuPanier[i].quantity = quantity.target.value;
        set = true;
        
        if(PanierComponent.contenuPanier[i].quantity == 0){
          PanierComponent.contenuPanier.splice(i,1);
          this.contenuPanier = PanierComponent.contenuPanier;
        }
      }      
      i++;
    }
    
    PanierComponent.montantTotal = PanierComponent.total() ;
    this.montantTotal = PanierComponent.montantTotal;
 

  }



 

}

export class article{
  book: Livre;
  quantity: number;
  idBook: number;
}
