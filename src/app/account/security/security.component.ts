import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import axios from "axios";
import {Account_ChangePassword} from "fusio-sdk/dist/src/generated/consumer/Account_ChangePassword";
import {FusioService} from "../../fusio.service";

@Component({
  selector: 'app-account-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  credentials: Account_ChangePassword = {
    oldPassword: '',
    newPassword: '',
    verifyPassword: '',
  };
  response?: Message;

  constructor(private fusio: FusioService) { }

  ngOnInit(): void {
  }

  async doSave() {
    try {
      if (!this.credentials) {
        return;
      }

      const group = await this.fusio.getClient().consumerUser();
      const response = await group.getConsumerAccountChangePassword().consumerActionUserChangePassword(this.credentials);

      this.response = response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        this.response = {
          success: false,
          message: String(error),
        };
      }
    }
  }

}
