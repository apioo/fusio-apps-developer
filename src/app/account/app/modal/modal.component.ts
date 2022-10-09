import { Component, OnInit } from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {App} from "fusio-sdk/dist/src/generated/consumer/App";
import Client from "fusio-sdk/dist/src/generated/consumer/Client";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {AppUpdate} from "fusio-sdk/dist/src/generated/consumer/AppUpdate";
import {AppCreate} from "fusio-sdk/dist/src/generated/consumer/AppCreate";
import {Scope} from "fusio-sdk/dist/src/generated/consumer/Scope";

@Component({
  selector: 'app-account-app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, App> {

  scopes?: Array<Scope>;

  override async ngOnInit(): Promise<void> {
    const scope = await this.fusio.getClient().getConsumerScope();
    const response = await scope.consumerActionScopeGetAll({count: 1024});
    this.scopes = response.data.entry;
  }

  protected async create(entity: App): Promise<AxiosResponse<Message>> {
    const app = await this.fusio.getClient().getConsumerApp();
    return await app.consumerActionAppCreate(<AppCreate> entity);
  }

  protected async update(entity: App): Promise<AxiosResponse<Message>> {
    const app = await this.fusio.getClient().getConsumerAppByAppId('' + entity.id);
    return await app.consumerActionAppUpdate(<AppUpdate> entity);
  }

  protected async delete(entity: App): Promise<AxiosResponse<Message>> {
    const app = await this.fusio.getClient().getConsumerAppByAppId('' + entity.id);
    return await app.consumerActionAppDelete();
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
