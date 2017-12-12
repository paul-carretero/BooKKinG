import { Notifiable } from './notifiable';

export interface Subscribable {

    subscribeForNotify(n: Notifiable): void;

    unSubscribe(n: Notifiable): void;
}
