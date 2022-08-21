import { Component, OnInit } from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {App} from "fusio-sdk/dist/src/generated/consumer/App";
import Client from "fusio-sdk/dist/src/generated/consumer/Client";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {App_Update} from "fusio-sdk/dist/src/generated/consumer/App_Update";
import {App_Create} from "fusio-sdk/dist/src/generated/consumer/App_Create";
import {Scope} from "fusio-sdk/dist/src/generated/consumer/Scope";

@Component({
  selector: 'app-account-app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, App> {

  scopes?: Array<Scope>;

  override async ngOnInit(): Promise<void> {
    const group = await this.fusio.getClient().consumerScope();
    const response = await group.getConsumerScope().consumerActionScopeGetAll({count: 1024});
    this.scopes = response.data.entry;
  }

  protected async create(entity: App): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().consumerApp();
    return await group.getConsumerApp().consumerActionAppCreate(<App_Create> entity);
  }

  protected async update(entity: App): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().consumerApp();
    return await group.getConsumerAppByAppId('' + entity.id).consumerActionAppUpdate(<App_Update> entity);
  }

  protected async delete(entity: App): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().consumerApp();
    return await group.getConsumerAppByAppId('' + entity.id).consumerActionAppDelete();
  }

  protected newEntity(): App {
    return {
      name: '',
      url: '',
      scopes: []
    };
  }

  scopeSelect(event: any, scope?: string) {
    const selected = event.target.checked;
    if (!scope) {
      return;
    }

    if (selected) {
      this.addScope(scope);
    } else {
      this.removeScope(scope);
    }
  }

  private addScope(scope: string) {
    this.entity.scopes?.push(scope)
  }

  private removeScope(scope: string) {
    this.entity.scopes = this.entity.scopes?.filter((value) => {
      return value !== scope;
    });
  }

}
