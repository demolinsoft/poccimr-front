export interface IDelegataire{
    id: number;
    nom: string;
	prenom: string;
	cin: string;
	nationalite: string;
	fonction: string;
    email: string;
	numeroMobilegsm: string;
	numeroTelFixe: string;
	dateDebutValidite: any;
	dateFinValidite: any;
	affilieSalaires: string;
	reglementEasyPayment: string;
	reglementEasyPaymentConjoint: string;
	liquidation: string;
}
export class Delegataire implements IDelegataire{
    constructor(){
        
    }
    id: number;
    nom: string;
    prenom: string;
    cin: string;
    nationalite: string;
    fonction: string;
    email: string;
    numeroMobilegsm: string;
    numeroTelFixe: string;
    dateDebutValidite: any;
    dateFinValidite: any;
    affilieSalaires: string;
    reglementEasyPayment: string;
    reglementEasyPaymentConjoint: string;
    liquidation: string;
}