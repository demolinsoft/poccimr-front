import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGestionnaire } from '../model/gestionnaire.model';

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  public gestionUrl = environment.urlAdhesion + 'gestionnairecomptes';
  public gestionCreateUrl = environment.urlAdhesion + 'addGestionnaireCompte';

  constructor(private http: HttpClient) { }
  createGestionnaire(gestion: IGestionnaire): Observable<IGestionnaire>{
    return this.http.post<IGestionnaire>(this.gestionCreateUrl, gestion);
  }
  getGestionnaire(): Observable<IGestionnaire[]> {
    return this.http.get<IGestionnaire[]>(this.gestionUrl);
  }
}
