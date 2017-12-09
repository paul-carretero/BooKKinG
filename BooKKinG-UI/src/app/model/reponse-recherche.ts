import { Livre } from './livre';

export class ReponseRecherche {
    books: Livre[];
    success: boolean;
    message: string;
}
