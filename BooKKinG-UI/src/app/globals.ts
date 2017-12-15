import { Injectable } from '@angular/core';
import { Init } from './model/init';
import { LivreService } from './service/livre.service';

@Injectable()
export class Globals {

  public static pageSize = 5;

  public static host: String = 'bookking.ovh'; // bookking.ovh ou localhost:8080 ou 192.168.1.39:8080

  public static initData: Init = new Init();

  public static genreLivres = new Map<string, string[]>(
    [
      ['ROMAN', ['DRAMATIQUE', 'SF', 'FANTASY', 'POLICIER', 'HORREUR', 'ANY']],
      ['MAGAZINE', ['HISTOIRE', 'ART', 'LOISIR', 'ANY']],
      ['MANGA', ['ROMANCE', 'POLICIER', 'FANTASY', 'ANY']],
      ['BD', ['ANY']],
      ['MANUEL', ['EDUCATIF', 'INFORMATIQUE', 'ANY']],
      ['ESSAI', ['BIOGRAPHIE', 'PHILOSOPHIE', 'ANY']],
      ['ANY', ['DRAMATIQUE', 'SF', 'FANTASY', 'POLICIER', 'ROMANCE',
        'HORREUR', 'HISTOIRE', 'ART', 'LOISIR', 'EDUCATIF', 'INFORMATIQUE', 'BIOGRAPHIE', 'PHILOSOPHIE', 'ANY']]
    ]
  );

  public static otherNavPage = ['HOME', 'LOGIN', 'COMPTE', 'PANIER'];

  public static typeLivre = Array.from(Globals.genreLivres.keys());

  private static displayable = new Map<string, string>(
    [
      ['ROMAN', 'Romans'],
      ['MAGAZINE', 'Magazines'],
      ['MANGA', 'Manga'],
      ['BD', 'BDs'],
      ['MANUEL', 'Manuels'],
      ['ESSAI', 'Essais'],
      ['ANY', 'Tous'],

      ['DRAMATIQUE', 'Dramatique'],
      ['SF', 'Scence Fiction'],
      ['FANTASY', 'Fantasy'],
      ['POLICIER', 'Policier'],
      ['ROMANCE', 'Romance'],
      ['HORREUR', 'Horreur'],
      ['HISTOIRE', 'Histoire'],
      ['ART', 'Art'],
      ['LOISIR', 'Loisir'],
      ['EDUCATIF', 'Educatif'],
      ['INFORMATIQUE', 'Informatique'],
      ['BIOGRAPHIE', 'Biographie'],
      ['PHILOSOPHIE', 'Philosophie'],

      ['LOGIN', 'Se Connecter'],
      ['COMPTE', 'Mon Compte'],
      ['HOME', 'Accueil'],
      ['PANIER', 'Panier'],
    ]
  );

  public static etapePaiment:string ='';
  public static payer :boolean = false;

  public static getDisplayableName(key: string): string {
    if (Globals.displayable.has(key)) {
      return Globals.displayable.get(key);
    } else {
      return key;
    }
  }

  public static getMode():string{
    return Globals.etapePaiment;
  }

  public static setEtat(b:boolean):void{
    Globals.payer=b;
  }

  public static getEtat():boolean{
    return Globals.payer;
  }

}
