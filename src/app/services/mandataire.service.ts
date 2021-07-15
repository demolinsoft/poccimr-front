import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMandataire } from '../model/mandataire.model';

@Injectable({
  providedIn: 'root'
})
export class MandataireService {
  public mandataireUrl = environment.urlAdhesion + 'mandataires';
  public mandataireCreateUrl = environment.urlAdhesion + 'addMandataire';
  
  constructor(private http: HttpClient) { }

  createMandataire(mandataire: IMandataire): Observable<IMandataire>{
    return this.http.post<IMandataire>(this.mandataireCreateUrl, mandataire);
  }
  getMandataires(): Observable<IMandataire[]> {
    return this.http.get<IMandataire[]>(this.mandataireUrl);
  }
}
