import { Globals } from '../globals';

export class Recherche {
    title: string;
    author: string;
    minPrice: number = Globals.initData.min;
    maxPrice: number = Globals.initData.max;
    type: string;
    genre: string;
    anySearch: string;
    page = 1;

    equals(other: Recherche): boolean {
        return this.title === other.title
            && this.author === other.author
            && this.maxPrice === other.maxPrice
            && this.minPrice === other.minPrice
            && this.type === other.type
            && this.genre === other.genre
            && this.anySearch === other.anySearch
            && this.page === other.page;
    }

    clone(): Recherche {
        const res = new Recherche();
        res.title = this.title;
        res.author = this.author;
        res.minPrice = this.minPrice;
        res.maxPrice = this.maxPrice;
        res.type = this.type;
        res.genre = this.genre;
        res.anySearch = this.anySearch;
        res.page = this.page;
        return res;
    }
}
