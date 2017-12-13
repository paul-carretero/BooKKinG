import { Article } from './article';

export class ResponsePanier {
    items: Article[];
    success: boolean;
    message: string;
}
