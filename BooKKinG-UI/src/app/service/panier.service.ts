import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Livre } from '../model/livre';
import { Globals } from '../globals';
import { SimpleArticle } from '../model/simple-article';
import { Item } from '../model/item';
import { Article } from '../model/article';
import { ConnectionService } from './connection.service';
import { NotifService } from './notif.service';

@Injectable()
export class PanierService {

  private readonly urlPanier = Globals.host + `/Cart`;

  private contenuPanier: Article[] = [];

  constructor(private http: Http, private connectionService: ConnectionService, private notifService: NotifService) {
    this.connectionService.panierServiceRegister(this);
  }

  /**
   * Fonction permettant de récupérer le nombre des articles.
   * @param : rien
   * @return : le nombre des articles de type number
   */
  public getNumberOfItems(): number {
    let res = 0;
    for (const item of this.contenuPanier) {
      res += item.quantity;
    }
    return res;
  }

   /**
   * Fonction permettant de récupérer le nombre des articles.
   * @param : rien
   * @return : le nombre des articles de type number
   */
  public getTotalPrice(): number {
    let res = 0;
    for (const item of this.contenuPanier) {
      res += item.book.price * item.quantity;
    }
    return res;
  }

  /**
   * Fonction permettant de récupérer le contenu du panier.
   * @param : rien
   * @return : tableau des articles de type Article dans le panier
   */
  public getContenuPanier(): Article[] {
    return this.contenuPanier;
  }

  public synchroServer(): void {
    if (this.contenuPanier.length === 0) {
      // récupération du panier précédent du client
      this.recupererPanier();
    } else {
      // si le panier courant contient des articles
      this.enregistrerPanierEntier();
    }
  }

  /**
   * Méthode permettant d'ajouter un livre au panier
   * @param livre livre à ajouter au panier
   * @param quantity le nombre du livre à ajouter
  */
  public ajouterLivrePanier(livre: Livre, quantity: number) {
    let i = 0;
    let ajoute = false;

    // on recherche si le livre est déjà présent dans le panier
    while (!ajoute && i < this.contenuPanier.length) {
      // si il était déjà présent
      if (livre.idBook === this.contenuPanier[i].idBook) {
        // on augmente sa quantité
        this.contenuPanier[i].quantity += quantity;
        ajoute = true;
        this.tryUpdateItemOnServer(livre.idBook, this.contenuPanier[i].quantity);
      }
      i++;
    }
    // si le livre n'était pas déjà présent dans le panier
    if (!ajoute) {
      // on l'ajoute dans le panier
      this.contenuPanier[i] = { book: livre, quantity: quantity, idBook: livre.idBook };
      this.tryUpdateItemOnServer(livre.idBook, quantity);
    }
    this.notifService.publish('Le livre ' + livre.title + ' a été ajouté à votre panier');
  }

  /**
   * Méthode permettant de redéfinir le nombre du livre au panier
   * @param idBook ID du livre à modifier au panier
   * @param quantity le nombre du livre à modifier
  */
  public setQuantity(idBook: number, quantity: number) {
    let i = 0;
    let set = false;

    // on met à jour le panier local
    while (!set && i < this.contenuPanier.length) {
      // quand on l'a trouvé
      if (idBook === this.contenuPanier[i].idBook) {
        // on met à jour la quantité du livre
        this.contenuPanier[i].quantity = quantity;
        set = true;

        // si le livre se retrouve avec une quantité égale à 0
        if (this.contenuPanier[i].quantity === 0) {
          // on le supprime du panier
          this.contenuPanier.splice(i, 1);
        }
      }
      i++;
    }

    // si le client est connecté, on met aussi à jour le panier distant
    this.tryUpdateItemOnServer(idBook, quantity);
  }

  private tryUpdateItemOnServer(idBook: number, quantity: number) {
    // si le client est connecté, on met aussi à jour le panier distant
    if (this.connectionService.getConnectionStatus()) {
      // on met à jour le panier gardé dans la base de donnée
      const articleSimple: SimpleArticle = new SimpleArticle();
      articleSimple.idBook = idBook;
      articleSimple.quantity = quantity;
      this.miseAJourQuantiteLivre(articleSimple);
    }
  }

  /**
   * Fonction permettant de récupérer le panier.
   * Retourne le panier enregistré dans la base de donnée (au format JSON)
   * @param :rien 
  */
  public recupererPanier(): void {
    this.http.get(this.urlPanier, { withCredentials: true }).map(res => res.json()).subscribe(
      reponse => {
        if (reponse.success) {
          this.contenuPanier = reponse.items;
        } else {
          console.log(reponse.message);
        }
      }
    );
  }

  /**
   * Fonction permettant de sauvegarder le panier dans la base de donnée (au format JSON).
   * @param :rien 
  */
  public enregistrerPanierEntier(): void {
    const enregistrementPanier = this.simplePanier(this.contenuPanier);
    this.http.post(this.urlPanier, enregistrementPanier, { withCredentials: true }).map(res => res.json()).subscribe(
      res => {
        if (!res.success) {
          console.log(res.message);
        }
      }
    );
  }


  /**
   * Fonction permettant de modifier la quantité du livre dans la base de donnée (au format JSON).
   * @param updatedArticle : article à modifier de type SimpleArticle
   * @return : rien
  */
  public miseAJourQuantiteLivre(updatedArticle: SimpleArticle): void {
    this.http.put(this.urlPanier, updatedArticle, { withCredentials: true }).map(res => res.json()).subscribe(
      reponse => {
        if (!reponse.success) {
          console.log(reponse.message);
        }
      }
    );
  }

   /**
   * Fonction permettant de vider le panier dans la base de donnée (au format JSON).
   * @param :rien 
  */
  public viderPanier(): void {
    this.contenuPanier = [];
    if (this.connectionService.getConnectionStatus()) {
      this.http.delete(this.urlPanier, { withCredentials: true }).map(res => res.json()).subscribe(
        reponse => {
          if (!reponse.success) {
            alert(reponse.message);
          }
        }
      );
    }
  }
  
 /**
   * Fonction permettant de créer le panier. 
   * @param contenuPanier: les articles qui se trouvent au panier (un tableau de type Article)
   * @return : un panier de type Item
  */
  public simplePanier(contenuPanier: Article[]): Item {
    const panier: Item = new Item();
    let i = 0;
    contenuPanier.forEach(
      article => {
        panier.items[i] = new SimpleArticle();
        panier.items[i].idBook = article.idBook;
        panier.items[i].quantity = article.quantity;
        i++;
      }
    );
    return panier;
  }
}
