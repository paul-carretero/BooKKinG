import { ConnectionComponent } from './../../composant/connection/connection.component';
import { Livre } from './../../model/livre';
import { PanierService } from './../../service/panier.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Router } from '@angular/router';
import { PayerComponent } from '../payer/payer.component';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})


export class PanierComponent implements OnInit {
//  static list : ListLivre;
  static tabLivre : Livre[] =[];
  static montantTotal : number;
  listeLivre : Livre[] =[];
  montantTotal : number;

  constructor(private router : Router) { }


  ngOnInit() { 
    this.listeLivre = PanierComponent.tabLivre; 
    this.montantTotal = PanierComponent.montantTotal;
  }


    
/*
    public payerAvecAdresse(){
      let montant = this.total();


    }

    public payerPointCollecte(){
      let montant = this.total();
      
    }
*/


    public static ajouterLivrePanier(livre : Livre){
        console.log("dans ajouter Livre au panier");
        console.log("livre a ajouter : " + livre.title);
        this.tabLivre[this.tabLivre.length] = livre;
        if (this.tabLivre[this.tabLivre.length-1] == livre)console.log("livre bien ajouté");
        this.montantTotal = this.total() ;
   
      }

      public static total(){
        let montant = 0;
        for(let livre of this.tabLivre){
          montant = montant + livre.price;
        }
         console.log("total du panier : " + montant); 
         return montant;
      }


   public payer(){
    console.log("dans payer du panier");   
    if(ConnectionComponent.client){
      PayerComponent.enCoursDePaiement = true; 
      this.router.navigate(['livraison']);
      //this.router.navigate(['payer']);      
    } 
    else{
      PayerComponent.enCoursDePaiement = true; 
      this.router.navigate(['/connection']);
    }
    //this.router.navigate(['/menu-recherche']);

  }


}

