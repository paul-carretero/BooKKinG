import { Injectable } from '@angular/core';
import { Init } from './model/init';
import { LivreService } from './service/livre.service';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class Globals {

  public static readonly pageSize = 5;

  public static readonly prixLivraison = 5;

  // public static readonly host: string = '127.0.0.1:8080/BooKKinG-Server-web';

  public static readonly host: String = '';

  public static readonly headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

  public static readonly HTTP_OPTIONS = new RequestOptions({ headers: Globals.headers, withCredentials: true });

  public static readonly genreLivres = new Map<string, string[]>(
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

  public static readonly HOME = 'HOME';
  public static readonly LOGIN = 'LOGIN';
  public static readonly COMPTE = 'COMPTE';
  public static readonly PANIER = 'PANIER';
  public static readonly LIVRE = 'LIVRE';
  public static readonly ADMIN = 'ADMIN';
  public static readonly FIN_PAIEMENT = 'FIN_PAIEMENT';
  public static readonly LIVRAISON = 'LIVRAISON';
  public static readonly PAYER = 'PAYER';
  public static readonly RECHERCHE = 'RECHERCHE';

  public static readonly otherPage = new Map<string, string>(
    [
      [Globals.HOME, '/home'],
      [Globals.LOGIN, '/identification-inscription'],
      [Globals.COMPTE, '/compte'],
      [Globals.PANIER, '/panier'],
      [Globals.LIVRE, '/livre'],
      [Globals.ADMIN, '/admin'],
      [Globals.FIN_PAIEMENT, '/finPaiement'],
      [Globals.LIVRAISON, '/livraison'],
      [Globals.PAYER, '/payer'],
      [Globals.RECHERCHE, '/menu-recherche'],
    ]
  );

  public static readonly transactionPage = [Globals.FIN_PAIEMENT, Globals.PAYER, Globals.LIVRAISON];

  public static readonly pointLivraison = ['GRENOBLE', 'PARIS', 'BORDEAUX'];

  public static readonly typeLivre = Array.from(Globals.genreLivres.keys());

  public static readonly otherNavPage = Array.from(Globals.otherPage.keys());

  private static readonly displayable = new Map<string, string>(
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

      [Globals.LOGIN, 'Se Connecter'],
      [Globals.COMPTE, 'Mon Compte'],
      [Globals.HOME, 'Accueil'],
      [Globals.PANIER, 'Panier'],
      [Globals.ADMIN, 'Administration'],
      [Globals.PAYER, 'Paiement'],
      [Globals.FIN_PAIEMENT, 'Confirmation de commande'],
      [Globals.LIVRAISON, 'Choix du mode de livraison'],
      [Globals.RECHERCHE, 'Résultats de la recherche'],
    ]
  );

  public static getDisplayableName(key: string): string {
    if (Globals.displayable.has(key)) {
      return Globals.displayable.get(key);
    } else {
      return key;
    }
  }

  public static getRoute(key: string): string {
    if (Globals.otherPage.has(key)) {
      return Globals.otherPage.get(key);
    } else {
      return '/';
    }
  }
}
