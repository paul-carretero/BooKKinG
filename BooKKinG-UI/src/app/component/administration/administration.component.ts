import { ConnectionComponent } from './../../composant/connection/connection.component';
import { Client } from './../../model/client';
import { AdministrationService } from './../../service/administration.service';
import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})

/**
 * Composant permettant une administration de la base de donnée
 */
export class AdministrationComponent implements OnInit {
  clientConnecte : boolean;


  constructor(private service : AdministrationService) { }

  ngOnInit() {
    console.log("dans page d administration");
    this.clientConnecte = ConnectionComponent.clientConnecte ;
  }


  /**
   * Méthode permettant d'ajouter un ensemble de livre dans la base de donnée
   * @param livreBase L'ensemble de livre à ajouter
   * @param type le type de livre à ajouter
   */
  public ajouterLivresDansBase(livreBase : Livre[], type : string){
    // chaque livre est ajouté un part un dans la base de donnée
    livreBase.forEach(
      livre => this.service.ajouterLivre(livre).subscribe(
        reponse => {
        console.log('resultat de l ajout du' + type + " "  + livre.title + ' : ' + JSON.stringify(reponse));
        }
      )
    );
  }


  /**
   * Méthode permettant d'ajouter des romans dans la base de donnée
   */
  public ajouterRomans(){
    console.log("dans ajouter roman");  
    // ensemble des livres que l'on veut ajouter
    let livreBase = [
    {title:'Etiquette et espionnage', 
     author:'Gail Carriger', 
     genre : 'POLICIER',
     type :"roman", 
     price:7, stock:10, 
     summary:"Angleterre, début du XIXe siècle. Sophronia, 14 ans, est un défi permanent pour sa mère : elle préfère démonter les horloges et grimper aux arbres plutôt qu'apprendre les bonnes manières ! Mme Temminnick désespère que sa fille devienne jamais une parfaite lady, aussi l'inscrit-elle au Pensionnat de Mlle Géraldine qui s'attache au perfectionnement des jeunes dames de qualité. Très vite, Sophronia comprend que cette école ne correspond pas exactement à l'idée que sa mère s'en faisait. Certes, les jeunes filles y apprennent l'étiquette, mais aussi celui de la diversion, de l'espionnage et de l'acte de donner la mort - tout cela de la manière la plus civilisée possible, bien sûr. C'est une chose d'apprendre à faire une révérence comme il faut, c'en est une autre d'apprendre à la faire en lançant un couteau... "},
    
    {title:'D\'un monde à l\'autre', 
    author:'Pierre Bottero', 
    genre : 'FANTASY',
    type :"roman", 
    price:7.5, stock:10, 
    summary:"Quand Camille vit le poids lourd qui fonçait droit sur elle, elle se figea au milieu de la chaussée..."},
    
    {title:'Le livre des étoiles', 
     author:'Eric l\'homme', 
     genre : 'FANTASY',
     type :"roman", 
     price:10, stock:10, 
     summary:"Guillemot est un garçon du Pays d'Ys, situé à mi-chemin entre le monde réel et le Monde Incertain. Mais d'où lui viennent ses dons pour la sorcellerie que lui enseigne Maître Qadehar ? Et qu'est devenu Le Livre des Etoiles, qui referme le secret de puissants sortilèges ? Dans sa quête de vérité, Guillemot franchira la Porte qui conduit dans le Monde Incertain, peuplé de monstre et d'étranges tribus..."}
    ];

    this.ajouterLivresDansBase(livreBase, "roman");
    
  }

  



  /**
   * Méthode permettant d'ajouter des mangas dans la base de donnée
   */
  public ajouterMangas(){
    console.log("dans ajouter mangas");  
    // ensemble des livres que l'on veut ajouter
    let livreBase = [
    {title:'Fruits Basket, tome 1', 
     author:'Natsuki Takaya', 
     genre : 'romance',
     type :"manga", 
     price:6.99, stock:10, 
     summary:"Tohru, mignonne et courageuse lycéenne, vivait sous une tente, dans les bois. Recueillie pour ses talents en matière de travaux ménagers par la famille de Yuki Soma, un de ses camarades de classe, Tohru vit maintenant entrourée de garçons dans une grande maison. Mais ce qu'elle ignore, c'est que la famille Soma est victime d'une malédiction cachée. Certains de ses membres se tranforment, dans des circonstances particulières, en un des douze animaux du zodiaque chinois ! Avec d'aussi étranges personnages, la nouvelle vie de Tohru va lui réserver de nombreuses surprises."},
    
    {title:'Tsubasa Reservoir Chronicle, tome 1', 
    author:'CLAMP', 
    genre : 'fantasy',
    type :"manga", 
    price:7.5, stock:10, 
    summary:"Dans le pays de Clow, vivent Shaolan et Sakura, qui s'aiment secrètement malgré leurs différences sociales. Un jour, survient la catastrophe, lors d'une attaque ennemie sur le pays : Sakura perd sa mémoire pour des raisons mystérieuses ! "},
    
    {title:'City Hunter, tome 12', 
     author:'Tsukasa Hojo', 
     genre : 'policier',
     type :"manga", 
     price:8.5, stock:10, 
     summary:""}
    ];


    this.ajouterLivresDansBase(livreBase, "manga");
  }



  /**
   * Méthode permettant d'ajouter des manuels dans la base de donnée
   */
  public ajouterManuels(){
    console.log("dans ajouter manuels");  
    // ensemble des livres que l'on veut ajouter
    let livreBase = [
/*    {title:'Tsubasa Reservoir Chronicle, tome 1', 
    author:'CLAMP', 
    genre : 'fantasy',
    type :"manga", 
    price:7.5, stock:10, 
    summary:"Dans le pays de Clow, vivent Shaolan et Sakura, qui s'aiment secrètement malgré leurs différences sociales. Un jour, survient la catastrophe, lors d'une attaque ennemie sur le pays : Sakura perd sa mémoire pour des raisons mystérieuses ! "},
  */  
    {title:'MEGA Poussin', 
     author:'Véronique Babin', 
     genre : 'EDUCATION',
     type :"manuel", 
     price:11.5, stock:10, 
     summary:"Une encyclopédie pour les 3/6 ans. Découvrir le monde de tous les jours, la nature et le monde plus lointain. Comprendre son corps, le mouvement du temps. S'ouvrir à tout ce qui bouge autour de soi. Un livre pour demain, à lire dès aujourd'hui."},
     

    {title:'Logique et fondements de l\'informatique', 
    author:'Richard Lassaigne, Michel de Rougemont', 
    genre : 'INFORMATIQUE',
    type :"manuel", 
    price:21.9, stock:10, 
    summary:"Cet ouvrage présente les principaux domaines de la logique qui contribuent aux fondements de l'informatique. Il est issu de plusieurs enseignements en mathématiques et informatique. Le premier tome est consacré à la logique du 1er ordre, la calculabilité et les fonctions récursives, le lambda-calcul et les systèmes de type pour les langages fonctionnels. Le second tome traitera de la définissabilité et de la théorie de la complexité. Il s'adresse aux étudiants de 2e et 3e cycles, ainsi qu'aux élèves ingénieurs intéressés par les liens nécessaires entre la logique et l'informatique. Des exercices placés en fin de chapitre facilitent l'évaluation des acquis. Dès lors cet ouvrage représente un véritable outil tant pratique que théorique."}
   
    ];

    this.ajouterLivresDansBase(livreBase, "manuel");
  }
}
