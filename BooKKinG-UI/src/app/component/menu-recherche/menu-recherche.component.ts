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
  constructor(private router : Router) { }

  ngOnInit() {
    console.log("dans menu");
    
  }


  public romans(){
    //public contenuPanier(): Observable<Livre[]> { 
    /* return this.http.get(`http://localhost:8080/livres`)
     .map(res => res.json()._embedded.livres); 
     */
    console.log("dans menu romans");
     this.listeLivres = [
    {id:10, titre:'Etiquette et espionnage', auteur:'Gail Carriger', genre : 'roman', prix:7},
    {id:11, titre:'D\'un monde à l\'autre' , auteur:'Pierre Boterro', genre : 'roman', prix:15},
    {id:12, titre:'Le livre des étoiles', auteur:'Eric l\'homme', genre : 'roman', prix:10},
    
    ];
    
     //this.router.navigate(['/menu-recherche']);
   }

   public cuisine(){

    //public contenuPanier(): Observable<Livre[]> { 
    /* return this.http.get(`http://localhost:8080/livres`)
     .map(res => res.json()._embedded.livres); 
     */
    this.listeLivres = [
    {id:20, titre:'Recettes pour étudiant', auteur:'marmiton', genre:'cuisine', prix:10},
    {id:21, titre:'Wok en folie', auteur:'asiaCooking', genre:'cuisine', prix:19}
  
    ];
   }



   public ajouterAuPanier(livre : Livre){
    console.log("livre : " + livre.titre + " à ajouter au panier");
   }
}
