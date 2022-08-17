import { Component, OnInit } from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import axios from "axios";
import {FactoryService} from "../factory.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";

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

  constructor(private factory: FactoryService, private router: Router, private user: UserService) {
  }

  ngOnInit(): void {
  }

  async login() {
    this.loading = true;

    try {
      const client = this.factory.getClientWithCredentials(this.credentials.username, this.credentials.password);
      const account = await client.consumerUser();
      const response = await account.getConsumerAccount().consumerActionUserGet();

      this.user.login(response.data);

      this.router.navigate(['/']).then(() => {
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
        throw error;
      }
    }
  }

}

interface Credentials {
  username: string,
  password: string
}
