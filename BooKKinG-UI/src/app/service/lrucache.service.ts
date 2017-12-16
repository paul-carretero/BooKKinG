import { Injectable } from '@angular/core';
import { Recherche } from '../model/recherche';
import { Livre } from '../model/livre';
import { ReponseRecherche } from '../model/reponse-recherche';

@Injectable()
export class LRUCacheService {

  private static readonly MAX_CAPACITY = 4;

  private keyArray: Recherche[];

  private valueArray: ReponseRecherche[];

  private timestamp: number[];

  constructor() {
    this.keyArray = new Array(LRUCacheService.MAX_CAPACITY);
    this.valueArray = new Array(LRUCacheService.MAX_CAPACITY);
    this.timestamp = new Array(LRUCacheService.MAX_CAPACITY);
    let i = 0;
    while (i < this.timestamp.length) {
      this.timestamp[i] = 0;
      i++;
    }
  }

  // private methodes //

  private getIndexOf(key: Recherche): number {
    let i = 0;
    while (i < this.keyArray.length) {
      if (this.keyArray[i] != null && this.keyArray[i].equals(key)) {
        return i;
      }
      i++;
    }
    return null;
  }

  private getLeastRecentlyUsedIndex(): number {
    const lowerTs = Math.min.apply(null, this.timestamp);
    return this.timestamp.indexOf(lowerTs);
  }

  // public Interface //

  public get(key: Recherche): ReponseRecherche {
    const index: number = this.getIndexOf(key);
    if (index == null) {
      return null;
    }
    this.timestamp[index] = +(new Date());
    return this.valueArray[index];
  }

  public put(key: Recherche, value: ReponseRecherche): void {
    const index = this.getLeastRecentlyUsedIndex();
    this.keyArray[index] = key.clone();
    this.valueArray[index] = value;
    this.timestamp[index] = +(new Date);
  }

  public includes(key: Recherche): boolean {
    return this.getIndexOf(key) != null;
  }

  public getLivre(idBook: number): Livre {
    for (const listReponseRecherche of this.valueArray) {
      if (listReponseRecherche != null) {
        for (const livre of listReponseRecherche.books) {
          if (livre.idBook === idBook) {
            return livre;
          }
        }
      }
    }
    return null;
  }
}
