import { Livre } from './livre';
import { SimpleArticle } from './simple-article';

export class Commande {
    date: string; // date de la commande
    idCmd: number; // id de la commande
    books: Livre[]; // tableau des livre de la commande 
    items: SimpleArticle[]; // tableau associant l'id d'un livre de la commande à sa quantité
    success: boolean; // true
    message: string; // unused
}
