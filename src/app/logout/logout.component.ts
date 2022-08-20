import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "ngx-fusio-sdk";
import {User_Account} from "fusio-sdk/dist/src/generated/consumer/User_Account";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private user: UserService<User_Account>, private router: Router) {
  }

  ngOnInit(): void {
    this.user.logout();
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }

}
