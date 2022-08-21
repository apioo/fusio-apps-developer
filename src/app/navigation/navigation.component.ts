import {Component, OnInit} from '@angular/core';
import {User_Account} from "fusio-sdk/dist/src/generated/consumer/User_Account";
import {UserService} from "ngx-fusio-sdk";
import {FusioService} from "../fusio.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isAuthenticated = true;
  isMenuCollapsed = true;
  account?: User_Account;

  constructor(private fusio: FusioService, private user: UserService<User_Account>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.fusio.hasValidToken();
    this.account = this.user.get();
  }

}
