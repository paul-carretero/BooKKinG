import { Notifiable } from './notifiable';

export interface GenreGiver extends Notifiable {
    getCurrentGenre(): string;
    getMinPrice(): number;
    getMaxPrice(): number;
    setCurrentGenre(newGenre: string, updateSearch: boolean): void;
}
