export interface ICategorie{
    id: number;
    numCategorie: number;
	categorie: string;
	partsalariale: string;
	partpatronale: string;
	massesalariale: number;
	effectif: number;
	optionX: string;
}

export class Categorie implements ICategorie{
    constructor(){

    }
    id: number;
    numCategorie: number;
    categorie: string;
    partsalariale: string;
    partpatronale: string;
    massesalariale: number;
    effectif: number;
    optionX: string;
}