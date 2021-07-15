import { IIdentite } from "./identite.model";

export interface ISouscription{
    id: number;
    typeContrat: string;
	modePaiement: string;
	banque: string;
	numCompte: string;
	fichierRIB: string;
	delegataire: IIdentite; 
	category: IIdentite;
}
export class Souscription implements ISouscription{
    constructor(){
        
    }
    id: number;
    typeContrat: string;
    modePaiement: string;
    banque: string;
    numCompte: string;
    fichierRIB: string;
    delegataire: IIdentite;
    category: IIdentite;
}