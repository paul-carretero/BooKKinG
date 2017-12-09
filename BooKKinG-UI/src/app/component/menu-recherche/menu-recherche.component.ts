import { ConnectionComponent } from './../../composant/connection/connection.component';
import { PanierComponent } from './../panier/panier.component';
import { RechercheService } from './../../service/recherche.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livre } from '../../model/livre';
import { Recherche } from '../../model/recherche';
import { LivreComponent } from '../livre/livre.component';
import { rootRoute } from '@angular/router/src/router_module';
import { RouterOutlet } from '@angular/router/src/directives/router_outlet';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { PanierService, SimpleArticle } from '../../service/panier.service';
import { HeaderComponent } from '../header/header.component';
import { FiltreComponent } from '../filtre/filtre.component';
import { Notifiable } from '../../notifiable';

@Component({
  selector: 'app-menu-recherche',
  templateUrl: './menu-recherche.component.html',
  styleUrls: ['./menu-recherche.component.css']
})

/**
 * Composant concernant la recherche par menus (de type)
 */
export class MenuRechercheComponent implements OnInit, Notifiable {

  /**
   * Liste des livres qui correspondent au menu séléctionné
   */
  private listeLivres: Livre[];

  /**
   * Attribut contenant les informations concernant la recherche de livre
   */
  private recherche: Recherche = new Recherche();

  constructor(private router: Router, private service: RechercheService, private servicePanier: PanierService) { }

  ngOnInit() {
    HeaderComponent.rechercheSubscribe(this);
    FiltreComponent.rechercheSubscribe(this);
    this.notify();
  }

  notify(): void {
    this.recherche.type = HeaderComponent.getCurrentType();
    this.recherche.genre = FiltreComponent.getCurrentGenre();
    this.rechercher();
  }


    /**
    * Méthode demandant l'ajout d'un livre au panier
    * @param livre livre à ajouter au panier
    */
   public ajouterAuPanier(livre : Livre){
    console.log("livre : " + livre.title + " à ajouter au panier");
    PanierComponent.ajouterLivrePanier(livre, 1);
    if(ConnectionComponent.clientConnecte){
      let articleSimple : SimpleArticle = new SimpleArticle();
      articleSimple.idBook = livre.idBook;
      articleSimple.quantity = 1;
      this.servicePanier.miseAJourQuantiteLivre(articleSimple).subscribe(
        reponse =>{
          console.log("résultat de la mise à jour du panier : " + reponse.success);
        }
      );
    }

   }



   public rechercher() {
/*
    //code en dur
    switch (type) {
      case MenuRechercheComponent.typeLivres[0]:
        console.log("rechercher " + MenuRechercheComponent.typeLivres[0]);
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
      
        break;
      
      // recherche de manuels
      case MenuRechercheComponent.typeLivres[1]:
      console.log("rechercher " + MenuRechercheComponent.typeLivres[1]);
      this.listeLivres = [
        {idBook:10,
        title:'MEGA Poussin', 
        author:'Véronique Babin', 
        genre : 'EDUCATION',
        type :"manuel", 
        price:11.5, stock:10, 
        summary:"Une encyclopédie pour les 3/6 ans. Découvrir le monde de tous les jours, la nature et le monde plus lointain. Comprendre son corps, le mouvement du temps. S'ouvrir à tout ce qui bouge autour de soi. Un livre pour demain, à lire dès aujourd'hui."},
             
        
        {idBook:11,
        title:'Logique et fondements de l\'informatique', 
        author:'Richard Lassaigne, Michel de Rougemont', 
        genre : 'INFORMATIQUE',
        type :"manuel", 
        price:21.9, stock:10, 
        summary:"Cet ouvrage présente les principaux domaines de la logique qui contribuent aux fondements de l'informatique. Il est issu de plusieurs enseignements en mathématiques et informatique. Le premier tome est consacré à la logique du 1er ordre, la calculabilité et les fonctions récursives, le lambda-calcul et les systèmes de type pour les langages fonctionnels. Le second tome traitera de la définissabilité et de la théorie de la complexité. Il s'adresse aux étudiants de 2e et 3e cycles, ainsi qu'aux élèves ingénieurs intéressés par les liens nécessaires entre la logique et l'informatique. Des exercices placés en fin de chapitre facilitent l'évaluation des acquis. Dès lors cet ouvrage représente un véritable outil tant pratique que théorique."}
           
        ];
      break;
      
      // recherche de mangas
      case MenuRechercheComponent.typeLivres[2]:
      console.log("rechercher " + MenuRechercheComponent.typeLivres[2]);
      this.listeLivres = [
        {idBook:20,
         title:'Fruits Basket, tome 1', 
         author:'Natsuki Takaya', 
         genre : 'ROMANCE',
         type :"manga", 
         price:6.99, stock:10, 
         summary:"Tohru, mignonne et courageuse lycéenne, vivait sous une tente, dans les bois. Recueillie pour ses talents en matière de travaux ménagers par la famille de Yuki Soma, un de ses camarades de classe, Tohru vit maintenant entrourée de garçons dans une grande maison. Mais ce qu'elle ignore, c'est que la famille Soma est victime d'une malédiction cachée. Certains de ses membres se tranforment, dans des circonstances particulières, en un des douze animaux du zodiaque chinois ! Avec d'aussi étranges personnages, la nouvelle vie de Tohru va lui réserver de nombreuses surprises."},
        
        {idBook:21,
        title:'Tsubasa Reservoir Chronicle, tome 1', 
        author:'CLAMP', 
        genre : 'FANTASY',
        type :"manga", 
        price:7.5, stock:10, 
        summary:"Dans le pays de Clow, vivent Shaolan et Sakura, qui s'aiment secrètement malgré leurs différences sociales. Un jour, survient la catastrophe, lors d'une attaque ennemie sur le pays : Sakura perd sa mémoire pour des raisons mystérieuses ! "},
        
        {idBook:22,
         title:'City Hunter, tome 12', 
         author:'Tsukasa Hojo', 
         genre : 'POLICIER',
         type :"manga", 
         price:8.5, stock:10, 
         summary:""}
        ];      
      break;
  
      default:
        break;
    }
*/

    // partie serveur
    this.listeLivres = [];
    this.service.rechercherEnsembleLivre(this.recherche).subscribe(
      reponse => {
        console.log('resultat de la recherche ' + JSON.stringify(reponse));
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



   /*get typeLivre(){
     return MenuRechercheComponent.typeLivres;
   }*/


   public voirDetailLivre(livre: Livre) {
     LivreComponent.ajouterAuLivreDetaille(livre);
     this.router.navigate(['/livre']);
   }
}

