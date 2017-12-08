import { MenuRechercheComponent } from './../menu-recherche/menu-recherche.component';
import { PanierService, SimpleArticle } from './../../service/panier.service';
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


  constructor(private router : Router, private service : PanierService) { }


  ngOnInit() { 
    this.contenuPanier = PanierComponent.contenuPanier;
    this.montantTotal = PanierComponent.montantTotal;
// A TESTER !!
    // partie communiquant avec le serveur
    // si l'utilisateur est connecté, on met à jour son panier
  //  if(ConnectionComponent.clientConnecte) this.miseAJourPanier();
    
  }


  get montantGlobal(){
    return PanierComponent.montantTotal;
  };

/*
  public miseAJourPanier(){
    this.contenuPanier.forEach(
      article =>{
        let articleSimple : SimpleArticle = new SimpleArticle();
        articleSimple.idBook = article.idBook;
        articleSimple.quantity = article.quantity;
        this.service.miseAJourQuantiteLivre(articleSimple).subscribe(
          reponse =>{
            console.log("résultat de la mise à jour du panier : " + reponse.success);
          }
        );
      }
    );
  }
*/



  public supprimer(idBook : number){
    let trouve = false;
    let i = 0;
    
    // on recherche la position du livre dans le panier
    while(!trouve && i < PanierComponent.contenuPanier.length){
      // quand on l'a trouvé
      if(idBook == PanierComponent.contenuPanier[i].idBook){
        // on le supprime du panier
        PanierComponent.contenuPanier.splice(i,1);
        trouve = true;
      }
      i++;
    }
    // on met à jour le panier
    this.contenuPanier = PanierComponent.contenuPanier;
    PanierComponent.montantTotal=PanierComponent.total();
    this.montantTotal= PanierComponent.montantTotal;



// A TESTER !!
    // Partie communiquant avec le serveur 
    // si l'utilisateur est connecté
    if(ConnectionComponent.clientConnecte){
      // on met à jour le panier gardé dans la base de donnée 
      let articleSimple : SimpleArticle = new SimpleArticle();
      articleSimple.idBook = idBook;
      articleSimple.quantity = 0;
      this.service.miseAJourQuantiteLivre(articleSimple).subscribe(
        reponse =>{
          if(reponse.success) console.log("la mise à jour de l'article dans la panier est réussie");
        }
      );
    }

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
    // on recherche si le livre est déjà présent dans le panier
    while(!ajoute && i < PanierComponent.contenuPanier.length){
      // si il était déjà présent
      if(livre.idBook == PanierComponent.contenuPanier[i].idBook){
        // on augmente sa quantité
        PanierComponent.contenuPanier[i].quantity++;
        ajoute = true;
      }
      i++;
    }
    // si le livre n'était pas déjà présent dans le panier
    if(!ajoute){
      // on l'ajoute dans le panier, avec une quantité de 1
      PanierComponent.contenuPanier[i] = { book:livre, quantity:1, idBook: livre.idBook };
    }

    // on met à jour le total du panier
    this.montantTotal = this.total() ;
    
   }
    
  /**
  * Méthode permettant de calculer le montant total des articles dans le panier
  */
  public static total(){
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
      this.router.navigate(['/identification-inscription']);
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
    this.service.viderPanier().subscribe(
      reponse => {
        console.log("vider panier " + JSON.stringify(reponse));
      }
    );
  }

 
  public set(livre : Livre, quantity : any){
    console.log("dans set");
    console.log("livre : " + livre.title);
    console.log("quantity : " + quantity.target.value);
    
    let i : number = 0;
    let set : boolean = false;
    let quantiteLivre = Number( quantity.target.value)

    // on recherche le livre dans le panier
    while(!set && i < PanierComponent.contenuPanier.length){
      // quand on l'a trouvé
      if(livre.idBook == PanierComponent.contenuPanier[i].idBook){
        // on met à jour la quantité du livre
        PanierComponent.contenuPanier[i].quantity = quantiteLivre;
        set = true;
        
        // si le livre se retrouve avec une quantité égale à 0
        if(PanierComponent.contenuPanier[i].quantity == 0){
          // on le supprime du panier
          PanierComponent.contenuPanier.splice(i,1);
          this.contenuPanier = PanierComponent.contenuPanier;
        }
      }      
      i++;
    }
    

    // on met à jour le panier
    PanierComponent.montantTotal = PanierComponent.total() ;
    this.montantTotal = PanierComponent.montantTotal;
    
// A TESTER !!
    // Partie communiquant avec le serveur   
    // si l'utilisateur est connecté
    if(ConnectionComponent.clientConnecte){
      // on met à jour le panier gardé dans la base de donnée 
      let articleSimple : SimpleArticle = new SimpleArticle();
      articleSimple.idBook = livre.idBook;
      articleSimple.quantity = quantiteLivre ;
      this.service.miseAJourQuantiteLivre(articleSimple).subscribe(
        reponse =>{
          if(reponse.success) console.log("la mise à jour de l'article dans la panier est réussie");
        }
      );  
    }

  }



 

}

export class article{
  book: Livre;
  quantity: number;
  idBook: number;
}
