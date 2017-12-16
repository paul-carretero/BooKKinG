import { Livre } from './livre';
import { SimpleArticle } from './simple-article';
import { Reponse } from './reponse';

export class Commande extends Reponse {
    date: string; // date de la commande
    idCmd: number; // id de la commande
    books: Livre[]; // tableau des livre de la commande
    items: SimpleArticle[]; // tableau associant l'id d'un livre de la commande à sa quantité
    total: number; // montant total de la commande
    /**
     * montant de la livraison
     */
    shippingCost : number ;
    /**
     * adresse de livraison
     */
    shippingAddress : string;
}
