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
      { idBook:0,
        title:'Etiquette et espionnage', 
       author:'Gail Carriger', 
       genre : 'POLICIER',
       type :"roman", 
       price:7, stock:10, 
       summary:"Angleterre, début du XIXe siècle. Sophronia, 14 ans, est un défi permanent pour sa mère : elle préfère démonter les horloges et grimper aux arbres plutôt qu'apprendre les bonnes manières ! Mme Temminnick désespère que sa fille devienne jamais une parfaite lady, aussi l'inscrit-elle au Pensionnat de Mlle Géraldine qui s'attache au perfectionnement des jeunes dames de qualité. Très vite, Sophronia comprend que cette école ne correspond pas exactement à l'idée que sa mère s'en faisait. Certes, les jeunes filles y apprennent l'étiquette, mais aussi celui de la diversion, de l'espionnage et de l'acte de donner la mort - tout cela de la manière la plus civilisée possible, bien sûr. C'est une chose d'apprendre à faire une révérence comme il faut, c'en est une autre d'apprendre à la faire en lançant un couteau... "},
      
      {idBook:1,
      title:'D\'un monde à l\'autre', 
      author:'Pierre Bottero', 
      genre : 'FANTASY',
      type :"roman", 
      price:7.5, stock:10, 
      summary:"Quand Camille vit le poids lourd qui fonçait droit sur elle, elle se figea au milieu de la chaussée..."},
      
      {idBook:2,
       title:'Le livre des étoiles', 
       author:'Eric l\'homme', 
       genre : 'FANTASY',
       type :"roman", 
       price:10, stock:10, 
       summary:"Guillemot est un garçon du Pays d'Ys, situé à mi-chemin entre le monde réel et le Monde Incertain. Mais d'où lui viennent ses dons pour la sorcellerie que lui enseigne Maître Qadehar ? Et qu'est devenu Le Livre des Etoiles, qui referme le secret de puissants sortilèges ? Dans sa quête de vérité, Guillemot franchira la Porte qui conduit dans le Monde Incertain, peuplé de monstre et d'étranges tribus..."}
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
