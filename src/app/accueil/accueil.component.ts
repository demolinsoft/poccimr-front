import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonneeService } from '../services/donnee.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  afficher = true;
  adherer = true;
  constructor(private router: Router, public donneeService: DonneeService) { }

  ngOnInit() {
  }
  poursuivre() {
    this.afficher = false;
  }
  // est adherant
  ouiAdherent() {
    document.getElementById('oui').style.backgroundColor = 'black';
    document.getElementById('oui').style.color ='white';
    document.getElementById('non').style.backgroundColor = 'transparent';
    document.getElementById('non').style.color ='black'
    this.donneeService.estAdherent = true;
  }
  nonAdherent(){
    document.getElementById('oui').style.backgroundColor = 'transparent';
    document.getElementById('oui').style.color ='black'
    document.getElementById('non').style.backgroundColor = 'black';
    document.getElementById('non').style.color ='white';
    this.donneeService.estAdherent = false;
  }
  suivant(){
    this.adherer = false;
  }
  // type adherant
  physique(){
    document.getElementById('p').style.backgroundColor = 'black';
    document.getElementById('p').style.color ='white';
    document.getElementById('m').style.backgroundColor = 'transparent';
    document.getElementById('m').style.color ='black';
    this.donneeService.typeAdherent = 'physique';
  }
  morale(){
    document.getElementById('p').style.backgroundColor = 'transparent';
    document.getElementById('p').style.color ='black'
    document.getElementById('m').style.backgroundColor = 'black';
    document.getElementById('m').style.color ='white';
    this.donneeService.typeAdherent = 'morale';
  }

  adhesion(){
    this.router.navigate(['/adhesion']);
  }

}
