import { Injectable } from '@angular/core';
import { Recherche } from '../model/recherche';
import { Livre } from '../model/livre';
import { ReponseRecherche } from '../model/reponse-recherche';

/**
 * Classe proposant un service de cache local pour les recherches et leurs résultats
 * Si le cache est saturé alors le résultat de la recherche la moins récente et la moins accédé est supprimé
 */
@Injectable()
export class LRUCacheService {

  /**
   * Nombre de recherche en cache
   */
  private static readonly MAX_CAPACITY = 4;

  /**
   * ensemble des recherche disponible dans le cache
   */
  private readonly keyArray: Recherche[];

  /**
   * ensemble des réponse associé au recherche du cache (même index dans le tableau)
   */
  private readonly valueArray: ReponseRecherche[];

  /**
   * ensemble des moment de modification ou d'accession aux recherche
   */
  private readonly timestamp: number[];

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

  /**
   * @param key une recherche
   * @returns l'index dans les tableau de cette recherche
   */
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

  /**
   * @returns l'index de la recherche utilisé la moins récemment
   */
  private getLeastRecentlyUsedIndex(): number {
    const lowerTs = Math.min.apply(null, this.timestamp);
    return this.timestamp.indexOf(lowerTs);
  }

  // public Interface //

  /**
   * recherche le résultat d'une recherche dans le cache
   * @param key une recherche
   * @returns une reponse pour cette recherche ou null si elle n'est pas dans le cache
   */
  public get(key: Recherche): ReponseRecherche {
    const index: number = this.getIndexOf(key);
    if (index == null) {
      return null;
    }
    this.timestamp[index] = +(new Date());
    return this.valueArray[index];
  }

  /**
   * insère une recherche et son résultat dans le cache
   * si le cache est plein, écrase la recherche la plus ancienne
   * @param key une recherche
   * @param value le résultat de cette recherche
   */
  public put(key: Recherche, value: ReponseRecherche): void {
    const index = this.getLeastRecentlyUsedIndex();
    this.keyArray[index] = key.clone();
    this.valueArray[index] = value;
    this.timestamp[index] = +(new Date);
  }

  /**
   * vérifie si une recherche est disponible en cache
   * @param key une recherche
   * @returns true si cette recherche est présente dans le cache, false sinon
   */
  public includes(key: Recherche): boolean {
    return this.getIndexOf(key) != null;
  }

  /**
   * recherche un livre dans le cache
   * @param idBook id du livre à rechercher dans le cache
   * @returns le livre si il est dans le cache, null sinon
   */
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
