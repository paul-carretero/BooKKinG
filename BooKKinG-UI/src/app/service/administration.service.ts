import { Livre } from './../model/livre';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../globals';
import { Reponse } from '../model/reponse';
import { NotifService } from './notif.service';

@Injectable()
export class AdministrationService {

  private readonly urlLivre = Globals.host + `/Book`;

  private allLivres: Livre[];

  constructor(private http: Http, private notifService: NotifService) { }

  public ajouterLivre(livre: Livre): Observable<Reponse> {
    return this.http.post(this.urlLivre, livre, Globals.HTTP_OPTIONS).map(res => res.json());
  }

  /**
  * Appeler au service de back-end par la méthode get pour récupérer des livres
  * @param : rien
  * @return: rien
  */
  public récupérerAllLivres(): void {
    const conn = this.http.get(this.urlLivre + '/ALL', Globals.HTTP_OPTIONS).map(res => res.json());
    conn.subscribe(
      reponse => {
        if (reponse.success) {
          this.allLivres = reponse.books;
        } else {
          this.allLivres = [];
        }
      }
    );
  }

  /**
  * Récupérer des livres
  * @param : rien
  * @return: tableau de de livres
  */
  public getAllLivres(): Livre[] {
    if (this.allLivres == null) {
      this.récupérerAllLivres();
    }
    return this.allLivres;
  }

  /**
  * Appeler au service de back-end par la méthode get pour récupérer des livres
  * @param livre: un livre
  * @return: rien
  */
  public ajouterNouveauLivre(livre: Livre): void {
    livre.idBook = 0;
    this.http.post(this.urlLivre, livre, Globals.HTTP_OPTIONS).map(res => res.json()).subscribe(
      reponse => {
        if (reponse.success) {
          this.notifService.publish('Livre ' + livre.title + ' ajouté avec succès!');
        } else {
          console.log(reponse.message);
        }
      }
    );
  }

  /**
  * Modifier la quantité du livre 
  * @param idBook: id du livre de type number
  * @param quantity: la quantité du livre de type number
  * @return: rien
  */
  public setQuantity(idBook: number, quantity: number): void {
    this.http.post(this.urlLivre, { idBook: idBook, stock: quantity }, Globals.HTTP_OPTIONS).map(res => res.json()).subscribe(
      reponse => {
        if (!reponse.success) {
          console.log(reponse.message);
        }
      }
    );
  }
}
