import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Globals } from '../globals';
import { Init } from '../model/init';
import { Livre } from '../model/livre';
import { Promise } from 'q';

@Injectable()
export class InitService {

  private readonly urlInit = `http://` + Globals.host + `/BooKKinG-Server-web/Init`;

  private initData: Init;

  constructor(private http: Http) {
    this.initData = new Init();
  }

  public initConstantes(): Observable<any> {
    const conn = this.http.get(this.urlInit, { withCredentials: true }).map(res => res.json());
    conn.subscribe(
      reponse => {
        if (reponse.success) {
          this.initData = reponse;
          console.log(JSON.stringify(reponse.mostBuyBook));
        }
      }
    );
    return conn;
  }

  public getMaxPrice(): number {
    return this.initData.max;
  }

  public getMinPrice(): number {
    return this.initData.min;
  }

  public getMostBuyBook(): Livre {
    return this.initData.mostBuyBook;
  }

  public getNewestBook(): Livre {
    return this.initData.newestBook;
  }

  public getRandomBook(): Livre {
    return this.initData.randomBook;
  }
}
