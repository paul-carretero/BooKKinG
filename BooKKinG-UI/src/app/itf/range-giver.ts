import { Notifiable } from './notifiable';

export interface RangeGiver extends Notifiable {
    getMaximumPrice(): number;
    getMinimumPrice(): number;
}
