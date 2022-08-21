import { Component, OnInit } from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {App} from "fusio-sdk/dist/src/generated/consumer/App";
import Client from "fusio-sdk/dist/src/generated/consumer/Client";
import {Collection_Query} from "fusio-sdk/dist/src/generated/consumer/Collection_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/consumer/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-account-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, App> {

  protected async getAll(query: Collection_Query): Promise<AxiosResponse<Collection<App>>> {
    const group = await this.fusio.getClient().consumerApp();
    return await group.getConsumerApp().consumerActionAppGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<App>> {
    const group = await this.fusio.getClient().consumerApp();
    return await group.getConsumerAppByAppId(id).consumerActionAppGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/account/app';
  }

}
