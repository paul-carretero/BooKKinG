export interface Equalable {
    equals(o: any): boolean;
    clone(): Equalable;
}
