import { Component, OnInit } from '@angular/core';
import {User_PasswordReset} from "fusio-sdk/dist/src/generated/consumer/User_PasswordReset";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {FactoryService} from "../../factory.service";
import {ActivatedRoute} from "@angular/router";
import axios from "axios";
import {User_Email} from "fusio-sdk/dist/src/generated/consumer/User_Email";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  data: User_Email = {
    email: '',
  }

  captchaKey?: string

  response?: Message;
  loading = false

  constructor(private factory: FactoryService, protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (RECAPTCHA_KEY && RECAPTCHA_KEY !== '${RECAPTCHA_KEY}') {
      this.captchaKey = RECAPTCHA_KEY;
    }
  }

  public async doReset() {
    this.loading = true;

    try {
      if (this.captchaKey && !this.data.captcha) {
        throw new Error('No captcha provided');
      }

      const client = this.factory.getClientAnonymous();
      const account = await client.consumerUser();
      const response = await account.getConsumerPasswordReset().consumerActionUserResetPasswordRequest(this.data);

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

  setCaptcha(token: string) {
    this.data.captcha = token;
  }

}
