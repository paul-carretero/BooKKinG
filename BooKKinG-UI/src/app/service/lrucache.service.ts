import { Injectable } from '@angular/core';
import { Recherche } from '../model/recherche';
import { Livre } from '../model/livre';

@Injectable()
export class LRUCacheService {

  private static MAX_CAPACITY = 4;

  private keyArray: Recherche[];

  private valueArray: Livre[][];

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

  public get(key: Recherche): Livre[] {
    const index: number = this.getIndexOf(key);
    if (index == null) {
      return null;
    }
    this.timestamp[index] = +(new Date());
    return this.valueArray[index];
  }

  public put(key: Recherche, value: Livre[]): void {
    const index = this.getLeastRecentlyUsedIndex();
    this.keyArray[index] = key.clone();
    this.valueArray[index] = value;
    this.timestamp[index] = +(new Date);
  }

  public includes(key: Recherche): boolean {
    return this.getIndexOf(key) != null;
  }

  public getLivre(idBook: number): Livre {
    for (const listLivre of this.valueArray) {
      if (listLivre != null) {
        for (const livre of listLivre) {
          if (livre.idBook === idBook) {
            return livre;
          }
        }
      }
    }
    return null;
  }
}
