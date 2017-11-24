import { PanierService } from './../../service/panier.service';
import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { Client } from '../../model/client';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})


export class PanierComponent implements OnInit {
//  static list : ListLivre;
  static tabLivre : Livre[] =[];
  listeLivre : Livre[] =[];


  constructor() { }


  ngOnInit() {
    this.listeLivre = PanierComponent.tabLivre; 
  }


    public payer(){
      let montant = 0;
      for(let livre of this.listeLivre){
        montant = montant + livre.prix;
      }
       console.log("payer contenu du panier : " + montant); 
      return montant;
    }

    public payerAvecAdresse(){
      let montant = this.payer();


    }

    public payerPointCollecte(){
      let montant = this.payer();
      
    }

    public static ajouterLivrePanier(livre : Livre){
        console.log("dans ajouter Livre au panier");
        console.log("livre a ajouter : " + livre.titre);
        this.tabLivre[this.tabLivre.length] = livre;
        if (this.tabLivre[this.tabLivre.length-1] == livre)console.log("livre bien ajouté");
   }
  
    

}

