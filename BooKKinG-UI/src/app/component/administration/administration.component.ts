import { AdministrationService } from './../../service/administration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})

/**
 * Composant permettant une administration de la base de donnée
 */
export class AdministrationComponent implements OnInit {

  constructor(private service : AdministrationService) { }

  ngOnInit() {
    console.log("dans page d administration");
  }



  /**
   * Méthode permettant d'ajouter des romans dans la base de donnée
   */
  public ajouterRomans(){
    console.log("dans ajouter roman");  
    // ensemble des livres que l'on veut ajouter
    let livreBase = [
    { title:'Etiquette et espionnage', author:'Gail Carriger', genre : 'policier',type :"roman", price:7, stock:2, summary:""},
    {title:'D\'un monde à l\'autre' , author:'Pierre Boterro', genre : 'fantasy',type :"roman", price:15, stock:2, summary:""},
    {title:'Le livre des étoiles', author:'Eric l\'homme', genre : 'fantasy',type :"roman", price:10, stock:2, summary:""}
    ];

    // chaque livre est ajouté un part un dans la base de donnée
    livreBase.forEach(
      livre => this.service.ajouterLivre(livre).subscribe(
        reponse => {
          console.log('resultat de l ajout du roman ' + livre.title + ' : ' + JSON.stringify(reponse));
        }
      )
    );
  }
  
}
