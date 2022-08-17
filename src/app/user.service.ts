import { Injectable } from '@angular/core';
import {User_Account} from "fusio-sdk/dist/src/generated/consumer/User_Account";
import {FactoryService} from "./factory.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user?: User_Account;

  constructor(private factory: FactoryService) { }

  public login(user: User_Account): void {
    this.user = user;
    sessionStorage.setItem('fusio_user', JSON.stringify(user));
  }

  public get(): User_Account|undefined {
    if (!this.factory.hasValidToken()) {
      return undefined;
    }

    if (this.user) {
      return this.user;
    }

    const rawData = sessionStorage.getItem('fusio_user');
    if (!rawData) {
      return undefined;
    }

    return JSON.parse(rawData);
  }

  public logout(): void {
    this.user = undefined;
    sessionStorage.removeItem('fusio_user');
    this.factory.logout();
  }

}
