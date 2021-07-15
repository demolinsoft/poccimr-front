export interface IMandataire{
    id: number;
    prenom: string;
    nom: string;
    fonction: string;
    email: string;
    cin: string;
    nationalite: string;
    numeroMobilegsm: string;
    numeroTelFixe: string;
    dateDebutValidite: Date;
    dateFinValidite: Date;
}
export class Mandataire implements IMandataire{
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
    dateDebutValidite: Date;
    dateFinValidite: Date;
    
}