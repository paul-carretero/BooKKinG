import { PanierComponent } from './../panier/panier.component';
import { RechercheService, Recherche } from './../../service/recherche.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livre } from '../../model/livre';

@Component({
  selector: 'app-menu-recherche',
  templateUrl: './menu-recherche.component.html',
  styleUrls: ['./menu-recherche.component.css']
})

/**
 * Composant concernant la recherche par menus (de type)
 */
export class MenuRechercheComponent implements OnInit {
  /**
   * Liste des livres qui correspondent au menu séléctionné
   */
  listeLivres : Livre[];

  /**
   * Attribut contenant les informations concernant la recherche de livre
   */
  recherche : Recherche = new Recherche();



  constructor(private router : Router, private service : RechercheService) { }



  ngOnInit() {
    console.log("dans menu de type");
    // réinitialisation de la liste de livre à afficher
    this.listeLivres = [];  
  }

/**
 * Méthode pour récupérer un ensemble de livre de type roman
 */
  public romans(){
    console.log("dans menu romans");  

/*
    // code pour du test en dur
    this.listeLivres = [
    { title:'Etiquette et espionnage', author:'Gail Carriger', genre : 'policier',type :"roman", price:6.10, stock:2, summary:""},
    {title:'D\'un monde à l\'autre' , author:'Pierre Boterro', genre : 'fantasy',type :"roman", price:15, stock:2, summary:""},
    {title:'Le livre des étoiles', author:'Eric l\'homme', genre : 'fantasy',type :"roman", price:10.9, stock:2, summary:""}
    ];

*/

    // partie communiquant avec le serveur
    this.recherche.type = "roman";
    console.log("recherche de romans");
    this.service.rechercherEnsembleLivre(this.recherche).subscribe(
      reponse => {
        console.log('resultat de la recherche de romans ' + JSON.stringify(reponse));
        // si la recherche a réussie
        if(reponse.success){
          let i = 0;
          // chaque livre récupéré dans la base de donnée est ajouté à la liste des livres à afficher         
          reponse.books.forEach(
            livre =>{
              this.listeLivres[i] = livre;
              i++;     
            }
          );      
        }
      }
    );

   }



   public cuisine(){

/*     this.listeLivres = [
    {id:20, title:'Recettes pour étudiant', author:'marmiton', genre:'cuisine',type :"oeuvre", price:10},
    {id:21, title:'Wok en folie', author:'asiaCooking', genre:'cuisine', type :"oeuvre", price:19}
  
    ];
    */

    this.recherche.type = "cuisine";
    console.log("recherche de livre de cuisine");
    
    this.service.rechercherEnsembleLivre(this.recherche).subscribe(
      reponse => {
        console.log('resultat de la recherche de livre de cuisine ' + JSON.stringify(reponse));
        // si la recherche a réussie
        if(reponse.success){
          let i = 0;         
          reponse.books.forEach(livre =>{
            this.listeLivres[i] = livre;
            i++;

          });      
        }
      }
    );


   }


   /**
    * Méthode demandant l'ajout d'un livre au panier
    * @param livre livre à ajouter au panier
    */
   public ajouterAuPanier(livre : Livre){
    console.log("livre : " + livre.title + " à ajouter au panier");
    PanierComponent.ajouterLivrePanier(livre);

   }
}
