import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Adherent, IAdherent } from '../model/adherent.model';
import { Categorie, ICategorie } from '../model/categorie.model';
import { Delegataire, IDelegataire } from '../model/delegataire.model';
import { Gestionnaire, IGestionnaire } from '../model/gestionnaire.model';
import { Identite } from '../model/identite.model';
import { IMandataire, Mandataire } from '../model/mandataire.model';
import { ISousActivite, SousActivite } from '../model/sousActivite.model';
import { ISouscription, Souscription } from '../model/souscription.model';
import { AdherentService } from '../services/adherent.service';
import { CategorieService } from '../services/categorie.service';
import { DonneeService } from '../services/donnee.service';
import { GestionService } from '../services/gestion.service';
import { MandataireService } from '../services/mandataire.service';

@Component({
  selector: 'app-adhesion',
  templateUrl: './adhesion.component.html',
  styleUrls: ['./adhesion.component.scss']
})
export class AdhesionComponent implements OnInit {
  // table
  displayedColumns: string[] = ['select', 'produit', 'description', 'garanties'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  // table
  selectedForm = this.dataSource.data[0];
  estAdherent = false;
  typeAdherant = '';
  message = '';
  afficherMess = false;
  // souscription
  souscripForm = this.fb.group({
    id: [],
    typeContrat: [],
    modePaiement: [],
    banque: [],
    numCompte: [null, [Validators.required]],
    fichierRIB: [],
    delegataire: [null, [Validators.required]],
    category: [null, [Validators.required]],
  });
  // form adhesion
  adhereForm = this.fb.group({
    id: [],
    activite: [],
    dateCreation: [],
    estAdherent: [],
    fax: [],
    localiteRC: [],
    nif: [],
    numRC: [],
    numeroTel: [],
    raisonSociale: [null, [Validators.required]],
    typeAdherent: [],
    gestionnaireCompte: [null, [Validators.required]],
    mandataires: [null, [Validators.required]],
    sousActivite: [null, [Validators.required]],
    adresse: [],
  });
  adherent: Adherent;
  mandataire: Mandataire;
  gestionnaire: Gestionnaire
  sousActivite: SousActivite;
  souscrip: Souscription;

  sousForm = this.fb.group({
    id: [],
    libelleSousActivite: [null, [Validators.required]]
  });

  mandForm = this.fb.group({
    id: [],
    prenom: [null, [Validators.required]],
    nom: [],
    fonction: [],
    email: [],
    cin: [],
    nationalite: [],
    numeroMobilegsm: [],
    numeroTelFixe: [],
    dateDebutValidite: [],
    dateFinValidite: [],
  });

  gestForm = this.fb.group({
    id: [],
    prenom: [null, [Validators.required]],
    nom: [],
    fonction: [],
    email: [],
    cin: [],
    nationalite: [],
    numeroMobilegsm: [],
    numeroTelFixe: [],
  });
  delegaForm = this.fb.group({
    id: [],
    prenom: [null, [Validators.required]],
    nom: [],
    fonction: [],
    email: [],
    cin: [],
    nationalite: [],
    numeroMobilegsm: [],
    numeroTelFixe: [],
    dateDebutValidite: [],
    dateFinValidite: [],
    affilieSalaires: [],
    reglementEasyPayment: [],
    reglementEasyPaymentConjoint: [],
    liquidation: [],
  });
  categoForm = this.fb.group({
    id: [],
    numCategorie: [],
    categorie: [null, [Validators.required]],
    partsalariale: [],
    partpatronale: [],
    massesalariale: [],
    effectif: [],
    optionX: [],
  });
  delegataire: Delegataire;
  categorie: Categorie;
  mandataires: IMandataire[];
  gestionnaires: IGestionnaire[];
  sousActivites: ISousActivite[];
  categories: ICategorie[];
  delegataires: IDelegataire[];
  isSaving = false;
  isSavingGestion = false;
  isSavingManda = false;
  mandIden: Identite;
  gestIden: Identite;
  sousIden: Identite;
  catIden: Identite;
  delIden: Identite;
  contenu = true;
  texte = 'Adhésion à la CIMR';
  nationalites = ['Egyptienne','Gambienne','Ghanéenne','Marocaine','Sénégalaise'];
  fonctions = ['Enseignant','Ingénieur','Commerçant','Medecin'];
  constructor(public donneeService: DonneeService,
    private fb: FormBuilder,
    private router: Router,
    private adherentService: AdherentService,
    private mandataireService: MandataireService,
    private gestionService: GestionService,
    public datepipe: DatePipe,
    private cateService: CategorieService) { }

  ngOnInit() {
    this.listeSousActivite();
    this.listeMandataires();
    this.listeGestions();
    this.listeCategorie();
    this.listeDelegataire();
    this.souscrip = new Souscription();
    this.adherent = new Adherent();
    this.mandataire = new Mandataire();
    this.gestionnaire = new Gestionnaire();
    this.sousActivite = new SousActivite();
    this.categorie = new Categorie();
    this.delegataire = new Delegataire();
    this.estAdherent = this.donneeService.estAdherent;
    this.typeAdherant = this.donneeService.typeAdherent;
    this.updateFormAdhere(this.adherent);
    this.updateFormManda(this.mandataire);
    this.updateFormGest(this.gestionnaire);
    this.updateFormSous(this.sousActivite);
    this.updateFormDelega(this.delegataire);
    this.mandIden = new Identite();
    this.gestIden = new Identite();
    this.sousIden = new Identite();
    this.catIden = new Identite();
    this.delIden = new Identite();

  }
  listeDelegataire() {
    this.cateService.getDelegataire().subscribe(del => {
      this.delegataires = del;
    });
  }
  listeCategorie() {
    this.cateService.getCategorie().subscribe(cat => {
      this.categories = cat;
    });
  }
  updateFormSous(sous: ISousActivite) {
    this.sousForm.patchValue({
      libelleSousActivite: sous.libelleSousActivite
    });
  }
  updateSous(sous: ISousActivite) {
    sous.libelleSousActivite = this.sousForm.get(['libelleSousActivite']).value;
  }
  saveSous() {
    this.updateSous(this.sousActivite);
    this.adherentService.createSous(this.sousActivite).subscribe(
      () => {
        this.initSous();
        this.listeSousActivite();
        this.message = 'Création de sous activité réussie!'
        this.onSaveSuccess()
      },
      () => this.onSaveError());
  }
  initSous() {
    this.sousForm = this.fb.group({
      id: [],
      libelleSousActivite: [null, [Validators.required]]
    });
  }
  updateFormCategorie(cat: ICategorie) {
    this.categoForm.patchValue({
      // id: cat.id
      numCategorie: cat.numCategorie,
      categorie: cat.categorie,
      partsalariale: cat.partsalariale,
      partpatronale: cat.partpatronale,
      massesalariale: cat.massesalariale,
      effectif: cat.effectif,
      optionX: cat.optionX
    });
  }
  updateCategorie(cat: ICategorie) {
    cat.numCategorie = this.categoForm.get(['numCategorie']).value;
    cat.categorie = this.categoForm.get('categorie').value;
    cat.partsalariale = this.categoForm.get('partsalariale').value;
    cat.partpatronale = this.categoForm.get('partpatronale').value;
    cat.massesalariale = this.categoForm.get('massesalariale').value;
    cat.effectif = this.categoForm.get('effectif').value;
    cat.optionX = this.categoForm.get('optionX').value;
  }
  saveCategorie() {
    this.updateCategorie(this.categorie);
    this.cateService.create(this.categorie).subscribe(
      () => {
        this.initCate();
        this.listeCategorie();
        this.message = 'Creation de catégorie réussie!'
        this.onSaveSuccess()
      },
      () => this.onSaveError());

  }
  initCate() {
    this.categoForm = this.fb.group({
      id: [],
      numCategorie: [],
      categorie: [null, [Validators.required]],
      partsalariale: [],
      partpatronale: [],
      massesalariale: [],
      effectif: [],
      optionX: [],
    });
  }
  updateFormSouscrip(sousc: ISouscription) {
    this.souscripForm.patchValue({
      // id: adhere.id,
      typeContrat: sousc.typeContrat,
      modePaiement: sousc.modePaiement,
      banque: sousc.banque,
      numCompte: sousc.numCompte,
      fichierRIB: sousc.fichierRIB,
      delegataire: sousc.delegataire,
      category: sousc.category,
    });
  }
  updateSouscrip(sousc: ISouscription): void {
    this.catIden.id = this.souscripForm.get(['category']).value;
    this.delIden.id = this.souscripForm.get(['delegataire']).value;
    sousc.typeContrat = this.souscripForm.get(['typeContrat']).value;
    sousc.modePaiement = this.souscripForm.get(['modePaiement']).value;
    sousc.numCompte = this.souscripForm.get(['numCompte']).value;
    sousc.banque = this.souscripForm.get(['banque']).value;
    sousc.category = this.catIden;
    sousc.delegataire = this.delIden;
  }
  saveSouscrip() {
    this.updateSouscrip(this.souscrip);
    this.cateService.createSouscrip(this.souscrip).subscribe(
      () => {
        this.initSouscrip();
        this.message = 'Souscription réussie!'
        this.onSaveSuccess()
      },
      () => this.onSaveError());
  }
  initSouscrip() {
    this.souscripForm = this.fb.group({
      id: [],
      typeContrat: [],
      modePaiement: [],
      banque: [],
      numCompte: [],
      fichierRIB: [],
      delegataire: [],
      category: [],
    });
  }

  // adhesion
  updateFormAdhere(adhere: IAdherent) {
    this.adhereForm.patchValue({
      // id: adhere.id,
      activite: adhere.activite,
      estAdherent: adhere.estAdherent,
      raisonSociale: adhere.raisonSociale,
      numeroTel: adhere.numeroTel,
      fax: adhere.fax,
      typeAdherent: adhere.typeAdherent,
      numRC: adhere.numRC,
      dateCreation: adhere.dateCreation,
      gestionnaireCompte: adhere.gestionnaireCompte,
      mandataires: adhere.mandataires,
      sousActivite: adhere.sousActivite,
      adresse: adhere.adresse
    });
  }

  updateAdhere(adhere: IAdherent): void {
    let latest_date = this.datepipe.transform(this.adhereForm.get(['dateCreation']).value, 'yyyy-MM-dd HH:mm:ss');
    this.mandIden.id = this.adhereForm.get(['mandataires']).value;
    this.gestIden.id = this.adhereForm.get(['gestionnaireCompte']).value;
    this.sousIden.id = this.adhereForm.get(['sousActivite']).value;
    adhere.raisonSociale = this.adhereForm.get(['raisonSociale']).value;
    adhere.activite = this.adhereForm.get(['activite']).value;
    adhere.estAdherent = this.estAdherent;
    adhere.numeroTel = this.adhereForm.get(['numeroTel']).value;
    adhere.fax = this.adhereForm.get(['fax']).value;
    adhere.typeAdherent = this.typeAdherant;
    adhere.numRC = this.adhereForm.get(['numRC']).value;
    adhere.dateCreation = latest_date; //2021-04-30 11:20:41
    adhere.adresse = this.adhereForm.get(['adresse']).value;
    adhere.gestionnaireCompte = this.gestIden;
    adhere.mandataires = this.mandIden;
    adhere.sousActivite = this.sousIden;

  }
  updateFormDelega(manda: IDelegataire) {
    this.delegaForm.patchValue({
      // id: manda.id,
      prenom: manda.prenom,
      nom: manda.nom,
      fonction: manda.fonction,
      email: manda.email,
      cin: manda.cin,
      nationalite: manda.nationalite,
      numeroMobilegsm: manda.numeroMobilegsm,
      numeroTelFixe: manda.numeroTelFixe,
      dateDebutValidite: manda.dateDebutValidite,
      dateFinValidite: manda.dateFinValidite,
    });
  }
  updateDelega(delega: IDelegataire) {
    let dateDebut = this.datepipe.transform(this.delegaForm.get(['dateDebutValidite']).value, 'yyyy-MM-dd HH:mm:ss');
    let dateFin = this.datepipe.transform(this.delegaForm.get(['dateFinValidite']).value, 'yyyy-MM-dd HH:mm:ss');
    delega.prenom = this.delegaForm.get(['prenom']).value;
    delega.nom = this.delegaForm.get(['nom']).value;
    delega.cin = this.delegaForm.get(['cin']).value;
    delega.email = this.delegaForm.get(['email']).value;
    delega.fonction = this.delegaForm.get(['fonction']).value;
    delega.nationalite = this.delegaForm.get(['nationalite']).value;
    delega.numeroMobilegsm = this.delegaForm.get(['numeroMobilegsm']).value;
    delega.numeroTelFixe = this.delegaForm.get(['numeroTelFixe']).value;
    delega.dateDebutValidite = dateDebut;
    delega.dateFinValidite = dateFin;
  }

  saveDelegataire() {
    this.updateDelega(this.delegataire);
    this.cateService.createDelega(this.delegataire).subscribe(
      () => {
        this.initDela();
        this.listeDelegataire();
        this.message = 'Creation de délégataire réussie!'
        this.onSaveSuccess()
      },
      () => this.onSaveError());

  }
  initDela() {
    this.delegaForm = this.fb.group({
      id: [],
      prenom: [null, [Validators.required]],
      nom: [],
      fonction: [],
      email: [],
      cin: [],
      nationalite: [],
      numeroMobilegsm: [],
      numeroTelFixe: [],
      dateDebutValidite: [],
      dateFinValidite: [],
    });

  }
  updateFormManda(manda: IMandataire) {
    this.mandForm.patchValue({
      // id: manda.id,
      prenom: manda.prenom,
      nom: manda.nom,
      fonction: manda.fonction,
      email: manda.email,
      cin: manda.cin,
      nationalite: manda.nationalite,
      numeroMobilegsm: manda.numeroMobilegsm,
      numeroTelFixe: manda.numeroTelFixe,
      dateDebutValidite: manda.dateDebutValidite,
      dateFinValidite: manda.dateFinValidite,
    });
  }
  updateManda(manda: IMandataire) {
    manda.prenom = this.mandForm.get(['prenom']).value;
    manda.nom = this.mandForm.get(['nom']).value;
    manda.cin = this.mandForm.get(['cin']).value;
    manda.email = this.mandForm.get(['email']).value;
    manda.fonction = this.mandForm.get(['fonction']).value;
    manda.nationalite = this.mandForm.get(['nationalite']).value;
    manda.numeroMobilegsm = this.mandForm.get(['numeroMobilegsm']).value;
    manda.numeroTelFixe = this.mandForm.get(['numeroTelFixe']).value;
    manda.dateDebutValidite = this.mandForm.get(['dateDebutValidite']).value;
    manda.dateFinValidite = this.mandForm.get(['dateFinValidite']).value;
  }

  updateFormGest(geste: IGestionnaire) {
    this.gestForm.patchValue({
      prenom: geste.prenom,
      nom: geste.nom,
      fonction: geste.fonction,
      email: geste.email,
      cin: geste.cin,
      nationalite: geste.nationalite,
      numeroMobilegsm: geste.numeroMobilegsm,
      numeroTelFixe: geste.numeroTelFixe
    });
  }
  updateGestion(geste: IGestionnaire) {
    geste.prenom = this.gestForm.get(['prenom']).value;
    geste.nom = this.gestForm.get(['nom']).value;
    geste.fonction = this.gestForm.get(['fonction']).value;
    geste.email = this.gestForm.get(['email']).value;
    geste.cin = this.gestForm.get(['cin']).value;
    geste.nationalite = this.gestForm.get(['nationalite']).value;
    geste.numeroMobilegsm = this.gestForm.get(['numeroMobilegsm']).value;
    geste.numeroTelFixe = this.gestForm.get(['numeroTelFixe']).value;
  }
  initManda() {
    this.mandForm = this.fb.group({
      id: [],
      prenom: [null, [Validators.required]],
      nom: [],
      fonction: [],
      email: [],
      cin: [null, [Validators.required]],
      nationalite: [],
      numeroMobilegsm: [],
      numeroTelFixe: [],
      dateDebutValidite: [],
      dateFinValidite: [],
    });

  }
  initGest() {
    this.gestForm = this.fb.group({
      id: [],
      prenom: [null, [Validators.required]],
      nom: [],
      fonction: [],
      email: [],
      cin: [],
      nationalite: [],
      numeroMobilegsm: [],
      numeroTelFixe: [],
    });
  }
  initAdhere() {
    this.adhereForm = this.fb.group({
      id: [],
      activite: [],
      dateCreation: [],
      estAdherent: [],
      fax: [],
      localiteRC: [],
      nif: [],
      numRC: [],
      numeroTel: [],
      raisonSociale: [null, [Validators.required]],
      typeAdherent: [],
      gestionnaireCompte: [null, [Validators.required]],
      mandataires: [null, [Validators.required]],
      sousActivite: [null, [Validators.required]],
      adresse: [],
    });

  }
  afficherMessage() {
    this.afficherMess = true;
    setTimeout(() => {
      this.afficherMess = false;
    }, 3000);
  }

  saveAdherent() {
    this.updateAdhere(this.adherent);
    this.adherentService.create(this.adherent).subscribe(
      () => {
        this.initAdhere();
        this.message = 'votre adhésion a été effectuée avec succés.'
        this.onSaveSuccess()
      },
      () => this.onSaveError());
  }

  saveMand() {
    this.updateManda(this.mandataire);
    this.mandataireService.createMandataire(this.mandataire).subscribe(
      () => {
        this.initManda();
        this.message = 'création de mandataire réussie!';
        this.onSaveSuccess();
        this.listeMandataires();
      },
      () => this.onSaveError()
    );
  }
  onSaveSuccess(): void {
    this.afficherMessage();
    console.log('succés');
  }
  onSaveError(): void {
    console.log('erreur');
  }
  saveGestion() {
    this.updateGestion(this.gestionnaire);
    this.gestionService.createGestionnaire(this.gestionnaire).subscribe(
      () => {
        this.initGest();
        this.message = 'création de gestionnaire réussie!';
        this.onSaveSuccess()
        this.listeGestions();
      },
      () => this.onSaveError()
    );
  }
  retour() {
    this.router.navigate(['accueil']);
  }


  listeMandataires() {
    this.mandataireService.getMandataires().subscribe(manda => {
      this.mandataires = manda;
      console.log('mandtaire', manda[0].prenom);
    });
  }
  listeGestions() {
    this.gestionService.getGestionnaire().subscribe(gestion => {
      this.gestionnaires = gestion;
      console.log('gestion:', gestion[0].prenom);
    });
  }
  listeSousActivite() {
    this.adherentService.getActivite().subscribe(activ => {
      this.sousActivites = activ;
      console.log('activite:', activ[0].libelleSousActivite);
    });
  }

  saisieAdhesion() {
    document.getElementById('p1').style.backgroundColor = '#f8b322';
    document.getElementById('h1').style.color = '#000000';
    document.getElementById('pt1').style.borderBottom = '3px solid #f8b322';
    document.getElementById('p1').style.border = 'solid 1px #f8b322';
    // l'autre
    document.getElementById('p2').style.backgroundColor = 'transparent';
    document.getElementById('h2').style.color = '#989898';
    document.getElementById('pt2').style.borderBottom = 'none';
    document.getElementById('p2').style.border = 'solid 1px #989898';
    this.contenu = true;
    this.texte = 'Adhésion à la CIMR';
    document.getElementById('recta').style.backgroundImage = "url('../../assets/images/rectangle.svg')";
    document.getElementById('recta').style.height = '2578px';

  }
  saisieContrat() {
    document.getElementById('p2').style.backgroundColor = '#f8b322';
    document.getElementById('h2').style.color = '#000000';
    document.getElementById('pt2').style.borderBottom = '3px solid #f8b322';
    document.getElementById('p2').style.border = 'solid 1px #f8b322';
    // l'autre
    document.getElementById('p1').style.backgroundColor = 'transparent';
    document.getElementById('h1').style.color = '#989898';
    document.getElementById('pt1').style.borderBottom = 'none';
    document.getElementById('p1').style.border = 'solid 1px #989898';
    this.contenu = false;
    this.texte = 'Souscription au contrat de retraite';
    document.getElementById('recta').style.backgroundImage = "url('../../assets/images/rectangle_sous.svg')";
    document.getElementById('recta').style.height = '2115px';
  }

  // table

  selectRow(el: any) {
    this.selectedForm = el;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.produit + 1}`;
  }

}

// constant
export interface PeriodicElement {
  produit: string;
  description: string;
  garanties: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { produit: 'AL MOUNASSIB', description: 'produit al mounassib', garanties: '23/05/2021' },
  { produit: 'Al Kamil', description: 'produit al kamil', garanties: '10/10/2021' },
];