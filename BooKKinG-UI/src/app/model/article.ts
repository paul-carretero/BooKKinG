import { Livre } from './livre';
import { Reponse } from './reponse';

export class Article extends Reponse {
    book: Livre;
    quantity: number;
    idBook: number;
    isInStock?: boolean;
}
