import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User_Account} from "fusio-sdk/dist/src/generated/consumer/User_Account";
import {FactoryService} from "../factory.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isAuthenticated = true;
  account?: User_Account;

  constructor(private factory: FactoryService, private user: UserService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.factory.hasValidToken();
    this.account = this.user.get();
  }

}
