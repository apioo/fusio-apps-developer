import {Component, OnInit} from '@angular/core';
import {UserService} from "ngx-fusio-sdk";
import {ConsumerUserAccount} from "fusio-sdk";
import {ApiService} from "../api.service";
import {RouterLink} from "@angular/router";
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  imports: [
    RouterLink,
    NgbCollapse
  ],
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
