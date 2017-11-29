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

  contenuPanier : article[] = [];
  static contenuPanier : article[] = [];

  /**
   *  nombre dynamique permettant l'affcichage le montant total
   */
  montantTotal : number = 0.0;

  constructor(private router : Router) { }


  ngOnInit() { 
    this.contenuPanier = PanierComponent.contenuPanier;
    this.listeLivre = PanierComponent.tabLivre; 
    this.montantTotal = PanierComponent.montantTotal;
    this.getContenuPanier();
    
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
    let montant : number = 0;   
    for(let livre of this.tabLivre){

      console.log("montant prec du panier : " + montant);

      console.log("prix du livre : " + livre.price);

      montant = Math.round((montant + livre.price) * 100)/100;
      console.log("total du panier : " + montant);
    }
    console.log("total final du panier : " + montant); 
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
//    this.getContenuPanier();
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
      this.montantTotal = Math.round((this.montantTotal - livre.price) * 100)/100;
      
      PanierComponent.montantTotal = this.montantTotal;
      this.getContenuPanier();
    }
  }


  public contient(livre : Livre, listArticle : article[]) : [boolean, number] {
    console.log("dans contient");
    let resultat : [boolean, number] = [false, -1];
    let i = 0;
    while(!resultat[0] && i < listArticle.length){
      console.log("livre a verifier : " + livre.title);
      console.log("livre a comparer : " + listArticle[i].livre.title);
      if(this.livreEqual(listArticle[i].livre, livre)){
        console.log("résultat comparaison : true");
        resultat = [true,i];
      }
      i++;
    }
    return resultat;
  }

  public livreEqual(l1 : Livre, l2 : Livre) : boolean {
    let res = false;
    res = (l1.title == l2.title) 
       && (l1.author == l2.author) 
       && (l1.genre == l2.genre) 
       && (l1.type == l2.type)
       && (l1.price == l2.price);
    return res;
  }

  public getContenuPanier() {
    console.log("dans getContenuPanier");
    this.contenuPanier = [];
    PanierComponent.tabLivre.forEach(
      livre => {
        console.log("pour le livre " + livre.title);
        if(this.contenuPanier[0] != null){
          console.log("au moins un livre a déjà été traité");
          let res = this.contient(livre, this.contenuPanier);
          if(res[0]){
            console.log("le livre était déjà dans le panier");
            this.contenuPanier[res[1]].quatite = this.contenuPanier[res[1]].quatite + 1;
          } 
          else{
            console.log("le livre n'était pas encore dans le panier");
            console.log("taille du contenu du panier " + this.contenuPanier.length);
            let i = this.contenuPanier.length;
            console.log("taille du contenu du panier : i " + i);
            this.contenuPanier[i] = new article();
            this.contenuPanier[i].livre = livre;
            this.contenuPanier[i].quatite = 1;
          }
        }
        else{  
          console.log("premier livre à ajouter");
          this.contenuPanier[0] = new article();
          this.contenuPanier[0].livre = livre;
          this.contenuPanier[0].quatite = 1;
          console.log("taille du contenu du panier " + this.contenuPanier.length);
          
        } 
      }
    );
  }




}

export class article{
  livre : Livre;
  quatite : number;
}
