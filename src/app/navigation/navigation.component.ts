import {Component, OnInit} from '@angular/core';
import {UserService} from "ngx-fusio-sdk";
import {ApiService} from "../api.service";
import {ConsumerUserAccount} from "fusio-sdk/dist/ConsumerUserAccount";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isAuthenticated = true;
  isMenuCollapsed = true;
  account?: ConsumerUserAccount;

  constructor(private fusio: ApiService, private user: UserService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.fusio.hasValidToken();
    this.account = this.user.get();
  }

}
