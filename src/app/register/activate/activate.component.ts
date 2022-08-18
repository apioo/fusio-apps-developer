import { Component, OnInit } from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {FactoryService} from "../../factory.service";
import {ActivatedRoute, Router} from "@angular/router";
import axios from "axios";
import {User_Activate} from "fusio-sdk/dist/src/generated/consumer/User_Activate";

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  response?: Message;

  constructor(private factory: FactoryService, protected route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
   this.route.paramMap.subscribe(async params => {
      const token = params.get('token');
      if (token) {
        console.log(token);
        await this.activate(token);
      }
    });
  }

  private async activate(token: string) {
    let activate: User_Activate = {
      token: token
    };

    try {
      const client = this.factory.getClientAnonymous();
      const account = await client.consumerUser();
      const response = await account.getConsumerActivate().consumerActionUserActivate(activate);

      this.response = response.data;
    } catch (error) {
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
