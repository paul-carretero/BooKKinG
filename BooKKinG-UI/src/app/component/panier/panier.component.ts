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
   * Tableau contenant les livres contenus dans le panier
   */
  static tabLivre : Livre[] =[];
  /**
   * Montant total des livres contenus dans le panier
   */
  static montantTotal : number = 0.0;

  /**
   * Tableau de livre dynamique permettant l'affichage dans le html
   */
  listeLivre : Livre[] =[];

  /**
   *  nombre dynamique permettant l'affcichage le montant total
   */
  montantTotal : number = 0.0;

  constructor(private router : Router) { }


  ngOnInit() { 
    this.listeLivre = PanierComponent.tabLivre; 
    this.montantTotal = PanierComponent.montantTotal;
  }


  /**
   * Méthode permettant d'ajouter un livre au panier
   * @param livre livre à ajouter au panier
   */
  public static ajouterLivrePanier(livre : Livre){
    console.log("dans ajouter Livre au panier");
    console.log("livre a ajouter : " + livre.title);
    this.tabLivre[this.tabLivre.length] = livre;
    this.montantTotal = this.total() ;
   }
    
  /**
  * Méthode permettant de calculer le montant total des articles dans le panier
  */
  public static total(){
    let montant = 0;
    for(let livre of this.tabLivre){
      montant = montant + livre.price;
    }
    console.log("total du panier : " + montant); 
    return montant;
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
    this.listeLivre = PanierComponent.tabLivre = [];
    this.montantTotal =  PanierComponent.montantTotal = 0;
  }

  /**
   * Méthode pour retirer un livre du panier
   * @param livre le livre que l'on veut retirer du panier
   */
  public retirer(livre : Livre){
    console.log("dans retirer un livre du panier");
    console.log("retrait du livre : " + livre.title);
    let posLivre : number = -1;
    let i : number = 0;
    // recherche du livre dans le tableau contenant les livres du panier
    while (posLivre < 0 && i < PanierComponent.tabLivre.length ){
      if(livre == PanierComponent.tabLivre[i]){
        console.log("livre trouvé à la position : " + i);
        posLivre = i;
      }
      i++;
    }

    // si le livre à été trouvé
    if(posLivre != -1){
      console.log("recopie des livres du panier sans le livre sélectionné");
      let tab : Livre[] = [];
      i = 0;
      // on recopie l'ensemble des livres présents avant le livre
      while (i < posLivre ){
        console.log("recopie du livre : " + PanierComponent.tabLivre[i].title);
        tab[i] = PanierComponent.tabLivre[i]; 
        i++;
      }

      // on recopie la suite des livres présents dans le panier, en les décalant d'une position (en écrasant la valeur du livre à retirer)
      while (i < PanierComponent.tabLivre.length -1 ){
        tab[i] = PanierComponent.tabLivre[i+1]; 
        i++;
      }

      // mise à jour de la liste de livre du panier
      this.listeLivre  = tab;
      PanierComponent.tabLivre = this.listeLivre;
      // mise à jour du montant total des livres contenus dans le panier
      this.montantTotal = this.montantTotal - livre.price;
      PanierComponent.montantTotal = this.montantTotal;
    }
  }


}

