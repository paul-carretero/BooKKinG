import { Livre } from './livre';
import { Reponse } from './reponse';

export class Init extends Reponse {
    min = 0; // prix min des livres
    max = 100; // prix max des livres
    mostBuyBook = new Livre();
    randomBook = new Livre();
    newestBook = new Livre();
}
