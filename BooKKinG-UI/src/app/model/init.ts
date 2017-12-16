import { Livre } from './livre';
import { Reponse } from './reponse';

export class Init extends Reponse {
    /**
     * prix min des livres
     */
    min = 0;
    /**
     * prix max des livres
     */
    max = 100;
    mostBuyBook = new Livre();
    randomBook = new Livre();
    newestBook = new Livre();
}
