import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public myAccount;
  constructor() {
    this.myAccount = {
      name: 'Rania Hany',
      accountNumber: '45678'
    };
  }
}
