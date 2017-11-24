export class Livre {
    id?: number; // le ? Rend optionnel le champ. // l'id du livre dans la base de donnée
    title: string; // le titre du livre
    author: string;  // l'auteur du livre  
    genre : string; // le genre du livre : science fiction, policier, ...
    type : string; //le type de livre : roman, manga, ...
    price: number // prix du livre  

}
