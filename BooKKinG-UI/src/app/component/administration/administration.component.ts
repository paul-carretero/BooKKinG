import { ConnectionComponent } from './../../component/connection/connection.component';
import { Client } from './../../model/client';
import { AdministrationService } from './../../service/administration.service';
import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { ConnectionService } from '../../service/connection.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})

/**
 * Composant permettant une administration de la base de donnée
 */
export class AdministrationComponent implements OnInit {
  clientConnecte: boolean;


  constructor(private service: AdministrationService, private connectionService: ConnectionService) { }

  ngOnInit() {
    console.log('dans page d administration');
    this.clientConnecte = this.connectionService.getConnectionStatus();
  }


  /**
   * Méthode permettant d'ajouter un ensemble de livre dans la base de donnée
   * @param livreBase L'ensemble de livre à ajouter
   * @param type le type de livre à ajouter
   */
  public ajouterLivresDansBase(livreBase: Livre[], type: string) {
    // chaque livre est ajouté un part un dans la base de donnée
    livreBase.forEach(
      livre => this.service.ajouterLivre(livre).subscribe(
        reponse => {
          console.log('resultat de l ajout du' + type + ' ' + livre.title + ' : ' + JSON.stringify(reponse));
        }
      )
    );
  }


  /**
   * Méthode permettant d'ajouter des romans dans la base de donnée
   */
  public ajouterRomans() {
    console.log('dans ajouter roman');
    // ensemble des livres que l'on veut ajouter
    let livreBase = [
      {
        title: 'Etiquette et espionnage',
        author: 'Gail Carriger',
        genre: 'POLICIER',
        type: 'ROMAN',
        price: 7, stock: 10,
        summary: 'Angleterre, début du XIXe siècle. Sophronia, 14 ans, est un défi permanent pour sa mère : elle préfère démonter les horloges et grimper aux arbres plutôt qu\'apprendre les bonnes manières ! Mme Temminnick désespère que sa fille devienne jamais une parfaite lady, aussi l\'inscrit-elle au Pensionnat de Mlle Géraldine qui s\'attache au perfectionnement des jeunes dames de qualité. Très vite, Sophronia comprend que cette école ne correspond pas exactement à l\'idée que sa mère s\'en faisait. Certes, les jeunes filles y apprennent l\'étiquette, mais aussi celui de la diversion, de l\'espionnage et de l\'acte de donner la mort - tout cela de la manière la plus civilisée possible, bien sûr. C\'est une chose d\'apprendre à faire une révérence comme il faut, c\'en est une autre d\'apprendre à la faire en lançant un couteau... '
      },

      {
        title: 'D\'un monde à l\'autre',
        author: 'Pierre Bottero',
        genre: 'FANTASY',
        type: 'ROMAN',
        price: 7.5, stock: 10,
        summary: 'Quand Camille vit le poids lourd qui fonçait droit sur elle, elle se figea au milieu de la chaussée...'
      },

      {
        title: 'Le livre des étoiles',
        author: 'Eric l\'homme',
        genre: 'FANTASY',
        type: 'ROMAN',
        price: 10, stock: 10,
        summary: 'Guillemot est un garçon du Pays d\'Ys, situé à mi-chemin entre le monde réel et le Monde Incertain. Mais d\'où lui viennent ses dons pour la sorcellerie que lui enseigne Maître Qadehar ? Et qu\'est devenu Le Livre des Etoiles, qui referme le secret de puissants sortilèges ? Dans sa quête de vérité, Guillemot franchira la Porte qui conduit dans le Monde Incertain, peuplé de monstre et d\'étranges tribus...'
      }
    ];

    this.ajouterLivresDansBase(livreBase, 'ROMAN');

  }





  /**
   * Méthode permettant d'ajouter des mangas dans la base de donnée
   */
  public ajouterMangas() {
    console.log('dans ajouter mangas');
    // ensemble des livres que l'on veut ajouter
    let livreBase = [
      {
        title: 'Fruits Basket, tome 1',
        author: 'Natsuki Takaya',
        genre: 'ROMANCE',
        type: 'MANGA',
        price: 6.99, stock: 10,
        summary: 'Tohru, mignonne et courageuse lycéenne, vivait sous une tente, dans les bois. Recueillie pour ses talents en matière de travaux ménagers par la famille de Yuki Soma, un de ses camarades de classe, Tohru vit maintenant entrourée de garçons dans une grande maison. Mais ce qu\'elle ignore, c\'est que la famille Soma est victime d\'une malédiction cachée. Certains de ses membres se tranforment, dans des circonstances particulières, en un des douze animaux du zodiaque chinois ! Avec d\'aussi étranges personnages, la nouvelle vie de Tohru va lui réserver de nombreuses surprises.'
      },

      {
        title: 'Tsubasa Reservoir Chronicle, tome 1',
        author: 'CLAMP',
        genre: 'FANTASY',
        type: 'MANGA',
        price: 7.5, stock: 10,
        summary: 'Dans le pays de Clow, vivent Shaolan et Sakura, qui s\'aiment secrètement malgré leurs différences sociales. Un jour, survient la catastrophe, lors d\'une attaque ennemie sur le pays : Sakura perd sa mémoire pour des raisons mystérieuses ! '
      },

      {
        title: 'City Hunter, tome 12',
        author: 'Tsukasa Hojo',
        genre: 'POLICIER',
        type: 'MANGA',
        price: 8.5, stock: 10,
        summary: ''
      }
    ];


    this.ajouterLivresDansBase(livreBase, 'MANGA');
  }



  /**
   * Méthode permettant d'ajouter des manuels dans la base de donnée
   */
  public ajouterManuels() {
    console.log('dans ajouter manuels');
    // ensemble des livres que l'on veut ajouter
    let livreBase = [
      /*    {title:'Tsubasa Reservoir Chronicle, tome 1', 
          author:'CLAMP', 
          genre : 'fantasy',
          type :"manga", 
          price:7.5, stock:10, 
          summary:"Dans le pays de Clow, vivent Shaolan et Sakura, qui s'aiment secrètement malgré leurs différences sociales. Un jour, survient la catastrophe, lors d'une attaque ennemie sur le pays : Sakura perd sa mémoire pour des raisons mystérieuses ! "},
        */
      {
        title: 'MEGA Poussin',
        author: 'Véronique Babin',
        genre: 'EDUCATIF',
        type: 'MANUEL',
        price: 11.5, stock: 10,
        summary: 'Une encyclopédie pour les 3/6 ans. Découvrir le monde de tous les jours, la nature et le monde plus lointain. Comprendre son corps, le mouvement du temps. S\'ouvrir à tout ce qui bouge autour de soi. Un livre pour demain, à lire dès aujourd\'hui.'
      },


      {
        title: 'Logique et fondements de l\'informatique',
        author: 'Richard Lassaigne, Michel de Rougemont',
        genre: 'INFORMATIQUE',
        type: 'MANUEL',
        price: 21.9, stock: 10,
        summary: 'Cet ouvrage présente les principaux domaines de la logique qui contribuent aux fondements de l\'informatique. Il est issu de plusieurs enseignements en mathématiques et informatique. Le premier tome est consacré à la logique du 1er ordre, la calculabilité et les fonctions récursives, le lambda-calcul et les systèmes de type pour les langages fonctionnels. Le second tome traitera de la définissabilité et de la théorie de la complexité. Il s\'adresse aux étudiants de 2e et 3e cycles, ainsi qu\'aux élèves ingénieurs intéressés par les liens nécessaires entre la logique et l\'informatique. Des exercices placés en fin de chapitre facilitent l\'évaluation des acquis. Dès lors cet ouvrage représente un véritable outil tant pratique que théorique.'
      }

    ];

    this.ajouterLivresDansBase(livreBase, 'MANUEL');
  }



  public ajouterBD(){
    console.log("dans ajouter BD");  
    // ensemble des livres que l'on veut ajouter
    let livreBase = [
    {title:'Astérix - Tome 37 : Astérix et la Transitalique', 
     author:'Didier Conrad (Dessinateur), Jean-Yves Ferri (Scénario) ', 
     genre : 'ANY',
     type :"BD", 
     price:9.95, stock:10, 
     summary:"Les personnages créés par les deux génies du 9e art Albert Uderzo et René Goscinny sont de retour ! Après Astérix chez les Pictes et Le Papyrus de César, Astérix et Obélix reviennent dans Astérix et la Transitalique, le nouvel album signé par les talentueux Jean-Yves Ferri et Didier Conrad. N'en déplaise à Obélix, les Italiques, les habitants de l'Italie, ne sont pas tous des Romains, au contraire ! Les Italiques tiennent à préserver leur autonomie et voient d'un mauvais oeil les velléités de domination de Jules César et ses légions. Dans Astérix et la Transitalique, nos héros favoris s'engagent dans une aventure palpitante à la découverte de cette surprenante Italie antique !"},
    
    {title:'Les Légendaires - World Without : Le Royaume des larmes Tome 20 : Les Légendaires ', 
    author:'Patrick Sobral (Scénario), Patrick Sobral (Dessinateur)', 
    genre : 'ANY',
    type :"BD", 
    price:10.95, stock:10, 
    summary:"C'est un grand jour à Orchidia ! Des quatre coins d'Alysia, les grands de ce monde sont venus assister à l'épreuve du bâtonaigle de Jadilyna qui désignera la princesse Shun-Day comme reine du royaume à la place de sa tante, l'impitoyable Invidia. Mais dans l'ombre de cet événement se trame une sombre machination qui pourrait bien finir en tragédie. Mais qui est visé par cet infâme complot ?"},
    
    {title:'Lanfeust Odyssey - Tome 9 : Le stratège ingénu ', 
     author:'Christophe Arleston (Scénario), Didier Tarquin (Dessinateur)', 
     genre : 'ANY',
     type :"BD", 
     price:8.5, stock:10, 
     summary:"Au Castel Or-Azur la fête bat son plein mais Lanfeust n'est pas d'humeur à fêter quoique ce soit. Si ses armées sont en déroute, Lilth court toujours et il ne faut pas lui laisser le temps de reprendre des forces sinon tout serait à refaire. Il souhaite rassembler ses fidèles compagnons et partir à sa recherche au plus vite. Mais la déesse, dont la duplicité n'est plus à prouver, n'est pas si loin..."}
    ];


    this.ajouterLivresDansBase(livreBase, "BD");
  }



  public ajouterEssais(){
    console.log("dans ajouter essais");  
    // ensemble des livres que l'on veut ajouter
    let livreBase = [
    {title:'La guerre des intelligences ', 
     author:'Laurent Alexandre', 
     genre : 'PHYLOSOPHIE',
     type :"ESSAI", 
     price:20.90, stock:10, 
     summary:"L’intelligence artificielle peut elle dépasser les humains, et comment l’éducation doit faire sa révolution. \nDepuis la parution en 2011 de son premier essai La mort de la mort, comment la technomédecine va bouleverser l’humanité, Laurent Alexandre s’est révélé comme l’un des plus visionnaires analystes des révolutions technologiques.\n Il s’attaque aujourd’hui à l’Intelligence artificielle (IA) et aux vertigineuses mutations qu’elle va déclencher dans nos modes de vie, et en particulier dans notre conception de l’éducation. \n D’un côté, l’IA progresse bien plus vite que tous les pronostics avancés  : la rapidité d’apprentissage de l’IA est multipliée par 100 chaque année. Il faut trente ans pour former un ingénieur ou un radiologue, quelques heures pour éduquer une IA !\n De l’autre, une école qui n’a pas évolué depuis 250 ans qui forme aux métiers d’hier et qui n’a pas intégré le bouleversement inévitable que l’IA va provoquer sur le marché du travail. Comment faire pour que nos cerveaux biologiques résistent à l’IA et restent complémentaires  ? Comment nos enfants pourront-ils rester compétitifs face à l’IA  ? Comment l’éducation, non totalement darwinienne, trouvera-t-elle sa place à côté des cerveaux de silicium boostés par les moyens presque infinis des GAFA et autres géants américains et chinois  ?\n Quels scénarios l’Humanité devra-t-elle choisir  ? Faut-il accepter le vertige transhumaniste qui nous «  upgrade  » biologiquement mais nous maintient Homme  ? Fusionner avec l’IA en devenant des cyborgs  ? Interdire ou limiter puissamment l’IA ? \nC’est à cette réflexion fondamentale et passionnante que Laurent Alexandre nous invite."},
    
    {title:'La Fontaine Une école buissonnière', 
    author:'Erik Orsenna', 
    genre : 'BIOGRAPHIE',
    type :"ESSAI", 
    price:10.95, stock:10, 
    summary:"Depuis l’enfance, il est notre ami. Et les animaux de ses Fables, notre famille. Agneau, corbeau, loup, mouche, grenouille, écrevisse ne nous ont plus jamais quittés.Malicieuse et sage compagnie !Mais que savons-nous de La Fontaine, sans doute le plus grand poète de notre langue française ?Voici une promenade au pays vrai d’un certain tout petit Jean, né le 8 juillet 1621, dans la bonne ville de Château-Thierry, juste à l’entrée de la Champagne. Bientôt voici Paris, joyeux Quartier latin et bons camarades : Boileau, Molière, Racine.Voici un protecteur, un trop brillant surintendant des Finances, bientôt emprisonné. On ne fait pas sans risque de l’ombre au Roi Soleil.Voici un très cohérent mari : vite cocu et tranquille de l’être, pourvu qu’on le laisse courir à sa guise.Voici la pauvreté, malgré l’immense succès des Fables.Et, peut-être pour le meilleur, voici des Contes. L’Éducation nationale, qui n’aime pas rougir, interdisait de nous les apprendre. On y rencontre trop de dames « gentilles de corsage ».Vous allez voir comme La Fontaine ressemble à la vie : mi-fable, mi-conte.Gravement coquine."},
    
    {title:' Mon dernier rêve sera pour vous', 
     author:'Jean d\'Ormesson', 
     genre : 'BIOGRAPHIE',
     type :"ESSAI", 
     price:19.89, stock:10, 
     summary:"La gloire plaît aux femmes et les fascine comme le pouvoir. Chateaubriand - sans doute le plus grand écrivain français - lia plus que personne sa vie sentimentale à sa vie politique et littéraire. L'indifférence et la passion qui flottaient autour de lui faisaient se lever sur ses pas des bataillons de jeunes femmes, armées et casquées pour les combats de l'amour. A chacune il fut tenté de murmurer Mon dernier rêve sera pour vous. A une seule, avant sa mort, il dira ces quelques mots qui unissent aux yeux de l'histoire deux destins d'exception.La première biographie de jean d'Ormesson : le portrait d'un séducteur par un écrivain - et peut-être aussi l'inverse.Ce gros livre tient du mémoire, du feuilleton, de la chronique historique la plus sérieuse et du roman le plus brillant.Annie Coppermann"}
    ];


    this.ajouterLivresDansBase(livreBase, "ESSAI");
  }



  public ajouterMagazines(){
    console.log("dans ajouter magazine");  
    // ensemble des livres que l'on veut ajouter
    let livreBase = [
    {title:'Paris au temps des grands rois', 
     author:'Collectif', 
     genre : 'HISTOIRE',
     type :"MAGAZINE", 
     price:5.9, stock:10, 
     summary:"La vie de la population parisienne, l'organisation de la ville, les transports ou encore les métiers qui y étaient exercés. L'histoire de la cité retracée à travers les bâtiments toujours présents : places, fastueux hôtels particuliers du centre et habitats insalubres et surpeuplés des faubourgs."},
    
    {title:'André Derain, la décennie radicale', 
    author:'Collectif', 
    genre : 'ART',
    type :"MAGAZINE", 
    price:9.5, stock:10, 
    summary:""},

    {title:'Walking Dead Comics - Tome 20 : Walking Dead magazine', 
    author:'Collectif', 
    genre : 'LOISIR',
    type :"MAGAZINE", 
    price:6.95, stock:10, 
    summary:"Retrouvez toutes les informations sur l'univers de \"Walking Dead\" dans un magazine qui vous fera découvrir les coulisses de la série comics comme ceux de la série télévisée."},
    
    {title:'L\'art du pastel de Degas à Redon ', 
     author:'Collectif', 
     genre : 'ART',
     type :"MAGAZINE", 
     price:9, stock:10, 
     summary:"A l'occasion de l'exposition consacrée à la collection de pastels du Petit Palais, l'ouvrage offre un panorama des principaux courants artistiques de la seconde moitié du XIXe siècle, de l'impressionnisme au symbolisme, dont les fleurons sont constitués par les oeuvres de Berthe Morisot, Auguste Renoir, Paul Gauguin, Odilon Redon. Avec un point sur la technique et la conservation des pastels."}
    ];


    this.ajouterLivresDansBase(livreBase, "MAGAZINE");
  }





}
