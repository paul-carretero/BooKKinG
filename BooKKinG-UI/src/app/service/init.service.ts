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

  private readonly urlInit = `http://` + Globals.host + `/BooKKinG-Server-web/Init`;

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
