import { Article } from './article';
import { Reponse } from './reponse';

export class ResponsePanier extends Reponse {
    items: Article[];
}
