import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdherent } from '../model/adherent.model';
import { IGestionnaire } from '../model/gestionnaire.model';
import { ISousActivite, SousActivite } from '../model/sousActivite.model';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {
  public adherentUrl = 'http://france.gateway.webmethodscloud.com/gateway/CIMR/1/addAdherent';
  public sousActiviteUrl = environment.urlAdhesion + 'sousActivites';
  public sousUrl = environment.urlAdhesion + 'addSousactivite';
  

  constructor(private http: HttpClient) { }

  create(adhere: IAdherent): Observable<IAdherent> {
    return this.http.post<IAdherent>(this.adherentUrl, adhere);
  }
  getActivite(): Observable<ISousActivite[]> {
    return this.http.get<ISousActivite[]>(this.sousActiviteUrl);
  }
  createSous(sous: ISousActivite): Observable<ISousActivite> {
    return this.http.post<ISousActivite>(this.sousUrl, sous);

  }
 
}
