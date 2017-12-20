import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Globals } from '../globals';
import { Init } from '../model/init';
import { Livre } from '../model/livre';
import { Promise } from 'q';
import { Reponse } from '../model/reponse';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InitService {

  private readonly urlInit = Globals.host + `/Init`;

  private initData: Init;

  constructor(private http: Http) {
    this.initData = new Init();
  }

  public initConstantes(): Observable<Init> {
    const subj = new Subject<Init>();
    this.http.get(this.urlInit, Globals.HTTP_OPTIONS).map(res => res.json()).subscribe(
      reponse => {
        if (reponse.success) {
          this.initData = reponse;
        }
        subj.next(reponse);
      }
    );
    return subj;
  }

 /**
   * Fonction permettant de récupérer le prix maximal
   * @param : rien 
   * @return : le prix maximale de type number
   */
  public getMaxPrice(): number {
    return this.initData.max;
  }

  /**
   * Fonction permettant de récupérer le prix minimal
   * @param : rien 
   * @return : le prix minimal de type number
   */
  public getMinPrice(): number {
    return this.initData.min;
  }

  /**
   * Fonction permettant de récupérer le livre le plus acheté
   * @param : rien 
   * @return : le livre le plus acheté de type Livre
   */
  public getMostBuyBook(): Livre {
    return this.initData.mostBuyBook;
  }

  /**
   * Fonction permettant de récupérer le livre le plus nouveau
   * @param : rien 
   * @return : le livre le plus nouveau de type Livre
  */
  public getNewestBook(): Livre {
    return this.initData.newestBook;
  }

  public getRandomBook(): Livre {
    return this.initData.randomBook;
  }
}
