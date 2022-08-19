import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import axios from "axios";
import {UserService} from "ngx-fusio-sdk";
import {Router} from "@angular/router";
import {User_Account} from "fusio-sdk/dist/src/generated/consumer/User_Account";
import {ClientService} from "../client.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = {
    username: '',
    password: ''
  }

  response?: Message;
  loading = false

  constructor(private client: ClientService, private router: Router, private user: UserService<User_Account>) {
  }

  ngOnInit(): void {
  }

  async login() {
    this.loading = true;

    try {
      const client = this.client.getClientWithCredentials(this.credentials.username, this.credentials.password);
      const account = await client.consumerUser();
      const response = await account.getConsumerAccount().consumerActionUserGet();

      this.user.login(response.data);

      this.router.navigate(['/account']).then(() => {
        location.reload();
      });
    } catch (error) {
      this.loading = false;
      if (axios.isAxiosError(error) && error.response)  {
        this.response = {
          success: false,
          message: error.response.data.error_description || 'An unknown error occurred',
        };
      } else {
        this.response = {
          success: false,
          message: String(error),
        };
      }
    }
  }

}

interface Credentials {
  username: string,
  password: string
}
