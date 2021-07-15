import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuth = false;

  constructor() { }

  
 login(credentials: Login): boolean {
  return credentials.username==='utilisateur' && credentials.password==='password';
 }
 isAuthenticated(): boolean{
   return this.isAuth==true;
 }
}

