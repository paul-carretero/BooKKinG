export class Livre {
    id?: number; // le ? Rend optionnel le champ. // l'id du livre dans la base de donnée
    titre: string; // le titre du livre
    auteur: string;  // l'auteur du livre  
    genre : string; // le genre du livre : science fiction, policier, ...
    type : string; //le type de livre : roman, manga, ...
    prix: number // prix du livre  

}
