import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { PanierComponent } from '../panier/panier.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit {

  static staticLivre: Livre = {
    title:"L'art d'avoir toujours raison",
    author:"Arthur",
    genre: "Philo",
    type: "Roman",
    price: 20,
    stock: 5,
    summary: "blabla bla blabla. chfdohbifdhgiofs .reghuivo suiovhrtuioghigohvbuior \ngiczegfizgeifgufgizgfuie"
  };

  livre: Livre;

  nbLivre: number = 1;

  constructor(private router : Router) { }

  ngOnInit() {
    this.livre = LivreComponent.staticLivre;
  }

  public static ajouterAuLivreDetaille(livre: Livre){
    LivreComponent.staticLivre = livre;
  }

  /**
    * Méthode demandant l'ajout d'un livre au panier
    * @param livre livre à ajouter au panier
    */
   public ajouterAuPanier(livre : Livre) {
    console.log("livre : " + livre.title + " à ajouter au panier");
    PanierComponent.ajouterLivrePanier(livre, this.nbLivre);
   }

   public setNbLivre(nb: any) {
      this.nbLivre = nb.target.value;
   }


  public retourPageRecherche() {
    this.router.navigate(['menu-recherche']);
  }

}
