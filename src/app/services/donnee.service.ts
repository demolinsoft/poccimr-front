import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonneeService {
  estAdherent = false;
  typeAdherent = 'morale';

  constructor() { }
}
