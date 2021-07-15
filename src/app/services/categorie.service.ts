import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategorie } from '../model/categorie.model';
import { IDelegataire } from '../model/delegataire.model';
import { ISouscription } from '../model/souscription.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  public urlCategorie = environment.urlSouscription + 'addCategorie';
  public urlSouscrip = 'http://france.gateway.webmethodscloud.com/gateway/CIMR/1/addSouscription';
  public urlDelegataire = environment.urlSouscription + 'addDelegataire';
  public urlListCategorie = environment.urlSouscription + 'categories';
  public urlListDelegataire = environment.urlSouscription + 'delegataires';

  constructor(private http: HttpClient) { }

  create(cat: ICategorie): Observable<ICategorie> {
    return this.http.post<ICategorie>(this.urlCategorie, cat);
  }
  createDelega(del: IDelegataire): Observable<IDelegataire> {
    return this.http.post<IDelegataire>(this.urlDelegataire, del);
  }
  getCategorie(): Observable<ICategorie[]> {
    return this.http.get<ICategorie[]>(this.urlListCategorie);
  }
  getDelegataire(): Observable<IDelegataire[]> {
    return this.http.get<IDelegataire[]>(this.urlListDelegataire);
  }
  createSouscrip(sous: ISouscription): Observable<ISouscription> {
    return this.http.post<ISouscription>(this.urlSouscrip, sous);
  }
}
