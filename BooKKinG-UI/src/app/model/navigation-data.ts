import { Livre } from './livre';

export class NavigationData {
    type?: string;
    genre?: string;
    livre?: Livre;
    other?: string;
    search?: string;
    nPage = 1;

    equals(other: NavigationData): boolean {
        return other != null
            && other.type === this.type
            && other.genre === this.genre
            && other.livre === this.livre
            && other.other === this.other
            && other.search === this.search
            && other.nPage === this.nPage;
    }
}
