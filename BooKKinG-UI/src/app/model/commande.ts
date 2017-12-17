import { Livre } from './livre';
import { SimpleArticle } from './simple-article';
import { Reponse } from './reponse';

export class Commande extends Reponse {
    date = ''; // date de la commande
    idCmd = 0; // id de la commande
    books: Livre[] = []; // tableau des livre de la commande
    items: SimpleArticle[] = []; // tableau associant l'id d'un livre de la commande à sa quantité
    total = 0; // montant total de la commande
    shippingCost = 0; // montant de la livraison
    shippingAddress = ''; // adresse de livraison
}
