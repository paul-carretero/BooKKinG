import { Injectable } from '@angular/core';


@Injectable()
export class Globals {

  public static host: String = 'bookking.ovh'; // bookking.ovh ou localhost:8080 ou 192.168.1.39:8080

  public static typeLivres: string[] = ['ROMAN', 'MAGAZINE', 'MANGA', 'BD', 'MANUEL', 'ESSAI'];

}