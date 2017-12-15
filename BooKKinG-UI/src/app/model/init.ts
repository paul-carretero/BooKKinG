import { Livre } from './livre';
import { Reponse } from './reponse';

export class Init extends Reponse {
    /**
     * prix min des livres
     */
    min: number;
    /**
     * prix max des livres
     */
    max: number;
    mostBuyBook: Livre;
    randomBook: Livre;
    newestBook: Livre;
}
