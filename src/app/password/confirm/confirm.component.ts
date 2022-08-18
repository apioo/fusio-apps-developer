import { Component, OnInit } from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {FactoryService} from "../../factory.service";
import {ActivatedRoute} from "@angular/router";
import {User_Activate} from "fusio-sdk/dist/src/generated/consumer/User_Activate";
import axios from "axios";
import {User_PasswordReset} from "fusio-sdk/dist/src/generated/consumer/User_PasswordReset";
import {User_Register} from "fusio-sdk/dist/src/generated/consumer/User_Register";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  reset: User_PasswordReset = {
    token: '',
    newPassword: '',
  }

  passwordConfirm?: string;

  response?: Message;
  loading = false

  constructor(private factory: FactoryService, protected route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      const token = params.get('token');
      if (token) {
        this.reset.token = token;
      }
    });
  }

  public async doReset() {
    this.loading = true;

    try {
      if (this.reset.newPassword !== this.passwordConfirm) {
        throw new Error('The provided password does not match with the confirmation password');
      }

      const client = this.factory.getClientAnonymous();
      const account = await client.consumerUser();
      const response = await account.getConsumerPasswordReset().consumerActionUserResetPasswordExecute(this.reset);

      this.response = response.data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      if (axios.isAxiosError(error) && error.response)  {
        this.response = {
          success: false,
          message: error.response.data.message || 'An unknown error occurred',
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
