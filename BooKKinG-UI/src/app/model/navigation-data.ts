import { Livre } from './livre';

export class NavigationData {
    type?: string;
    genre?: string;
    livre?: Livre;
    other?: string;
    search?: string;
    nPage?: number;

    public equals(other: NavigationData): boolean {
        return other.type === this.type
            && other.genre === this.genre
            && other.livre === this.livre
            && other.other === this.other
            && other.search === this.search
            && other.nPage === this.nPage;
    }
}
