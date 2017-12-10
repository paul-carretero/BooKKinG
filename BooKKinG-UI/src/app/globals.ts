import { Injectable } from '@angular/core';


@Injectable()
export class Globals {

  public static host: String = 'bookking.ovh'; // bookking.ovh ou localhost:8080 ou 192.168.1.39:8080

  public static typeLivres: string[] = ['ROMAN', 'MAGAZINE', 'MANGA', 'BD', 'MANUEL', 'ESSAI', 'ANY'];

  public static genreAny: string[] = ['DRAMATIQUE', 'SF', 'FANTASY', 'POLICIER', 'ROMANCE',
  'HORREUR', 'HISTOIRE', 'ART', 'LOISIR', 'EDUCATIF', 'INFORMATIQUE', 'BIOGRAPHIE', 'PHYLOSOPHIE', 'ANY'];

  public static genreRoman: string[] = ['DRAMATIQUE', 'SF', 'FANTASY', 'POLICIER', 'HORREUR', 'ANY'];

  public static genreMagazine: string[] = ['HISTOIRE', 'ART', 'LOISIR', 'ANY'];

  public static genreManuel: string[] = ['EDUCATIF', 'INFORMATIQUE', 'ANY'];

  public static genreEssais: string[] = ['BIOGRAPHIE', 'PHYLOSOPHIE', 'ANY'];

  public static genreManga: string[] = ['ROMANCE', 'POLICIER', 'FANTASY', 'ANY'];

  public static genreBD: string[] = ['ANY'];

}
