import {Component, OnInit} from '@angular/core';
import {UserAccount} from "fusio-sdk/dist/src/generated/consumer/UserAccount";
import {ConsumerService, UserService} from "ngx-fusio-sdk";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isAuthenticated = true;
  isMenuCollapsed = true;
  account?: UserAccount;

  constructor(private consumer: ConsumerService, private user: UserService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.consumer.hasValidToken();
    this.account = this.user.get();
  }

}
