import { MenuRechercheComponent } from './../menu-recherche/menu-recherche.component';
import { PanierService } from './../../service/panier.service';
import { ConnectionComponent } from './../../composant/connection/connection.component';
import { Livre } from './../../model/livre';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Router } from '@angular/router';
import { PayerComponent } from '../payer/payer.component';
import { LivreComponent } from '../livre/livre.component';
import { forEach } from '@angular/router/src/utils/collection';
import { Article } from '../../model/article';
import { SimpleArticle } from '../../model/simple-article';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})

/**
 * Composant correspondant au panier
 */
export class PanierComponent implements OnInit {

  static contenuPanier: Article[] = [];

  /**
   *  nombre dynamique permettant l'affcichage le montant total
   */
  montantTotal = 0.0;

  public static getNumberOfItems(): number {
    let res = 0;
    for (const item of PanierComponent.contenuPanier) {
      res += item.quantity;
    }
    return res;
  }

  public static getTotalPrice(): number {
    let res = 0;
    for (const item of PanierComponent.contenuPanier) {
      res += item.book.price * item.quantity;
    }
    return res;
  }

  /**
   * Méthode permettant d'ajouter un livre au panier
   * @param livre livre à ajouter au panier
   */
  public static ajouterLivrePanier(livre: Livre, quantity: number) {
    console.log('dans ajouter Livre au panier');
    console.log('livre a ajouter : ' + livre.title);
    console.log('quantite a ajouter : ' + quantity);
    let i = 0;
    let ajoute = false;
    // on recherche si le livre est déjà présent dans le panier
    while (!ajoute && i < PanierComponent.contenuPanier.length) {
      // si il était déjà présent
      if (livre.idBook === PanierComponent.contenuPanier[i].idBook) {
        // on augmente sa quantité
        PanierComponent.contenuPanier[i].quantity += quantity;
        ajoute = true;
      }
      i++;
    }
    // si le livre n'était pas déjà présent dans le panier
    if (!ajoute) {
      // on l'ajoute dans le panier, avec une quantité de 1
      PanierComponent.contenuPanier[i] = { book: livre, quantity: quantity, idBook: livre.idBook };
    }
  }

  constructor(private router: Router, private service: PanierService) { }

  ngOnInit() {
    // A TESTER !!
    // partie communiquant avec le serveur
    // si l'utilisateur est connecté, on met à jour son panier
    //  if(ConnectionComponent.clientConnecte) this.miseAJourPanier();

  }

  private staticGetTotalPrice(): string {
    return PanierComponent.getTotalPrice().toFixed(2);
  }

  public detailLivre(livre: Livre) {
    this.router.navigate(['/livre/' + livre.idBook]);
  }

  get montantGlobal() {
    return PanierComponent.getTotalPrice();
  }

  get contenuPanier() {
    return PanierComponent.contenuPanier;
  }

  /*
    public miseAJourPanier(){
      this.contenuPanier.forEach(
        article =>{
          let articleSimple : SimpleArticle = new SimpleArticle();
          articleSimple.idBook = article.idBook;
          articleSimple.quantity = article.quantity;
          this.service.miseAJourQuantiteLivre(articleSimple).subscribe(
            reponse =>{
              console.log("résultat de la mise à jour du panier : " + reponse.success);
            }
          );
        }
      );
    }
  */

  public supprimer(idBook: number) {
    let trouve = false;
    let i = 0;
    // on recherche la position du livre dans le panier
    while (!trouve && i < PanierComponent.contenuPanier.length) {
      // quand on l'a trouvé
      if (idBook === PanierComponent.contenuPanier[i].idBook) {
        // on le supprime du panier
        PanierComponent.contenuPanier.splice(i, 1);
        trouve = true;
      }
      i++;
    }

    // A TESTER !!
    // Partie communiquant avec le serveur
    // si l'utilisateur est connecté
    if (ConnectionComponent.clientConnecte) {
      // on met à jour le panier gardé dans la base de donnée
      const articleSimple: SimpleArticle = new SimpleArticle();
      articleSimple.idBook = idBook;
      articleSimple.quantity = 0;
      this.service.miseAJourQuantiteLivre(articleSimple).subscribe(
        reponse => {
          if (reponse.success) {
            console.log('la mise à jour de l\'article dans la panier est réussie');
          }
        }
      );
    }
  }

  /**
  * Méthode appelée pour démarrer le processus de paiement
  */
  public payer() {
    console.log('dans payer du panier');
    PayerComponent.setEnCoursDePaiement(true);
    // si le client est connecté alors on peut démarrer le processus de paiement
    if (ConnectionComponent.clientConnecte) {
      this.router.navigate(['livraison']);
    } else {
      this.router.navigate(['/identification-inscription']);
    }
  }

  /**
   * Méthode pour vider le panier
   */
  public viderPanier() {
    console.log('dans vider panier');
    // this.listeLivre = PanierComponent.tabLivre = [];
    PanierComponent.contenuPanier = [];
    this.service.viderPanier().subscribe(
      reponse => {
        console.log('vider panier ' + JSON.stringify(reponse));
      }
    );
  }

  public setQuantity(livre: Livre, quantity: any) {
    console.log('dans set');
    console.log('livre : ' + livre.title);
    console.log('quantity : ' + quantity.target.value);

    let i = 0;
    let set = false;
    const quantiteLivre = Number(quantity.target.value);

    // on recherche le livre dans le panier
    while (!set && i < PanierComponent.contenuPanier.length) {
      // quand on l'a trouvé
      if (livre.idBook === PanierComponent.contenuPanier[i].idBook) {
        // on met à jour la quantité du livre
        PanierComponent.contenuPanier[i].quantity = quantiteLivre;
        set = true;

        // si le livre se retrouve avec une quantité égale à 0
        if (PanierComponent.contenuPanier[i].quantity === 0) {
          // on le supprime du panier
          PanierComponent.contenuPanier.splice(i, 1);
        }
      }
      i++;
    }

    // A TESTER !!
    // Partie communiquant avec le serveur
    // si l'utilisateur est connecté
    if (ConnectionComponent.clientConnecte) {
      // on met à jour le panier gardé dans la base de donnée
      const articleSimple: SimpleArticle = new SimpleArticle();
      articleSimple.idBook = livre.idBook;
      articleSimple.quantity = quantiteLivre;
      this.service.miseAJourQuantiteLivre(articleSimple).subscribe(
        reponse => {
          if (reponse.success) {
            console.log('la mise à jour de l\'article dans la panier est réussie');
          }
        }
      );
    }
  }
}
