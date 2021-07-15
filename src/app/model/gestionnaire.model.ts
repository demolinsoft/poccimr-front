export interface IGestionnaire{
    id: number;
    prenom: string;
    nom: string;
    fonction: string;
    email: string;
    cin: string;
    nationalite: string;
    numeroMobilegsm: string;
    numeroTelFixe: string;
}
export class Gestionnaire implements IGestionnaire{
    constructor(){
        
    }
    id: number;
    prenom: string;
    nom: string;
    fonction: string;
    email: string;
    cin: string;
    nationalite: string;
    numeroMobilegsm: string;
    numeroTelFixe: string;
    
}