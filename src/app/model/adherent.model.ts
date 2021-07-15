import { IGestionnaire } from "./gestionnaire.model";
import { IIdentite } from "./identite.model";
import { IMandataire } from "./mandataire.model";
import { ISousActivite } from "./sousActivite.model";

export interface IAdherent {
    id: number;
    activite: string;
    dateCreation: any;
    estAdherent: boolean;
    fax: string;
    localiteRC: string;
    nif: string;
    numRC: string;
    numeroTel: string;
    raisonSociale: string;
    typeAdherent: string;
    gestionnaireCompte: IIdentite;
    mandataires: IIdentite;
    sousActivite: IIdentite;
    adresse: string;
}

export class Adherent implements IAdherent {
    constructor(){

    }
    id: number;
    activite: string;
    dateCreation: Date;
    estAdherent: boolean;
    fax: string;
    localiteRC: string;
    nif: string;
    numRC: string;
    numeroTel: string;
    raisonSociale: string;
    typeAdherent: string;
    gestionnaireCompte: IGestionnaire;
    mandataires: IMandataire;
    sousActivite: ISousActivite;
    adresse: string;
    
}