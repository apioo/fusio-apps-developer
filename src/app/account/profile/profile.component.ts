import {Component, OnInit} from '@angular/core';
import {User_Account} from "fusio-sdk/dist/src/generated/consumer/User_Account";
import axios from "axios";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {FusioService} from "../../fusio.service";

@Component({
  selector: 'app-account-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user?: User_Account;
  response?: Message;
  email: string = '';

  constructor(private fusio: FusioService) { }

  async ngOnInit(): Promise<void> {
    try {
      const group = await this.fusio.getClient().consumerUser();
      const response = await group.getConsumerAccount().consumerActionUserGet();

      this.user = response.data;
      this.email = this.user.email || '';
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

  async doSave() {
    try {
      if (!this.user) {
        return;
      }

      const group = await this.fusio.getClient().consumerUser();
      const response = await group.getConsumerAccount().consumerActionUserUpdate(this.user);

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
