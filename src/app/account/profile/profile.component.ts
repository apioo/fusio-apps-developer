import { Component, OnInit } from '@angular/core';
import {FactoryService} from "../../factory.service";
import {User_Account} from "fusio-sdk/dist/src/generated/consumer/User_Account";
import axios from "axios";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user?: User_Account;
  response?: Message;

  constructor(private factory: FactoryService) { }

  async ngOnInit(): Promise<void> {
    try {
      const group = await this.factory.getClient().consumerUser();
      const response = await group.getConsumerAccount().consumerActionUserGet();

      this.user = response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

  async doSave() {
    try {
      if (!this.user) {
        return;
      }

      const group = await this.factory.getClient().consumerUser();
      const response = await group.getConsumerAccount().consumerActionUserUpdate(this.user);

      this.response = response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

}
