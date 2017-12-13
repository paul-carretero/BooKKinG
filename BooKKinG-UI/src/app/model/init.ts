import { Livre } from './livre';

export class Init {
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
    success: boolean;
    message: string;
}
