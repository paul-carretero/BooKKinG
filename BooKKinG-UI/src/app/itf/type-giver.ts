export interface TypeGiver {
    getCurrentType(): string;
    getAnySearch(): string;
    displayableType(type: string);
    setCurrent(newType: string, reloadSearch: boolean): void;
}
