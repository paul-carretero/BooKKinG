import { PanierComponent } from './../panier/panier.component';
import { RechercheService, Recherche } from './../../service/recherche.service';
import { Livre } from './../../model/livre';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-recherche',
  templateUrl: './menu-recherche.component.html',
  styleUrls: ['./menu-recherche.component.css']
})
export class MenuRechercheComponent implements OnInit {
  listeLivres : Livre[];
  recherche : Recherche;


  constructor(private router : Router, private service : RechercheService) { }

  ngOnInit() {
    console.log("dans menu");
    
  }


  public romans(){
    
    console.log("dans menu romans");
    
    this.listeLivres = [
    {id:10, titre:'Etiquette et espionnage', auteur:'Gail Carriger', genre : 'policier',type :"roman", prix:7},
    {id:11, titre:'D\'un monde à l\'autre' , auteur:'Pierre Boterro', genre : 'fantasy',type :"roman", prix:15},
    {id:12, titre:'Le livre des étoiles', auteur:'Eric l\'homme', genre : 'fantasy',type :"roman", prix:10},
    
    ];
/*    
    this.recherche.type = "roman";
    this.service.rechercherEnsembleLivre(this.recherche).subscribe(
      reponse => {
        console.log('resultat de la recherche de romans ' + JSON.stringify(reponse));
        // si la recherche a réussie
        if(reponse.success){
          this.listeLivres = reponse.livres;          
        }
      }
    );
*/


     //this.router.navigate(['/menu-recherche']);
   }

   public cuisine(){

    //public contenuPanier(): Observable<Livre[]> { 
    /* return this.http.get(`http://localhost:8080/livres`)
     .map(res => res.json()._embedded.livres); 
     */
    this.listeLivres = [
    {id:20, titre:'Recettes pour étudiant', auteur:'marmiton', genre:'cuisine',type :"oeuvre", prix:10},
    {id:21, titre:'Wok en folie', auteur:'asiaCooking', genre:'cuisine', type :"oeuvre", prix:19}
  
    ];
   }



   public ajouterAuPanier(livre : Livre){
    console.log("livre : " + livre.titre + " à ajouter au panier");

    PanierComponent.ajouterLivrePanier(livre);

   }
}
