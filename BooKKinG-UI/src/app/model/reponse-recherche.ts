import { Livre } from './livre';
import { Reponse } from './reponse';

export class ReponseRecherche extends Reponse {
    books: Livre[];
    resultsAvailable: number;
    pagesAvailable: number;
}
