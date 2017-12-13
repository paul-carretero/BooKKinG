import { Equalable } from '../itf/equalable';

export class LRUMapCache<V> {

    private keyArray: Equalable[];

    private valueArray: V[];

    private timestamp: number[];

    constructor(private maxCapacity: number) {
        this.keyArray = new Array(maxCapacity);
        this.valueArray = new Array(maxCapacity);
        this.timestamp = new Array(maxCapacity);
        let i = 0;
        while (i < this.timestamp.length) {
            this.timestamp[i] = 0;
            i++;
        }
    }

    // private methodes //

    private getIndexOf(key: Equalable): number {
        let i = 0;
        while (i < this.keyArray.length) {
            if (this.keyArray[i] != null && this.keyArray[i].equals(key)) {
                return i;
            }
            i++;
        }
        return null;
    }

    private getLeastRecentlyUsedIndex(): number {
        const lowerTs = Math.min.apply(null, this.timestamp);
        return this.timestamp.indexOf(lowerTs);
    }

    // public Interface //

    public get(key: Equalable): V {
        const index: number = this.getIndexOf(key);
        if (index == null) {
            return null;
        }
        this.timestamp[index] = +(new Date());
        return this.valueArray[index];
    }

    public put(key: Equalable, value: V): void {
        const index = this.getLeastRecentlyUsedIndex();
        this.keyArray[index] = key.clone();
        this.valueArray[index] = value;
        this.timestamp[index] = +(new Date);
    }

    public includes(key: Equalable) {
        return this.getIndexOf(key) != null;
    }
}
