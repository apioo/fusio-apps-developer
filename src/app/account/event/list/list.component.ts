import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/consumer/Client";
import {Collection_Query} from "fusio-sdk/dist/src/generated/consumer/Collection_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/consumer/Collection";
import {ModalComponent} from "../modal/modal.component";
import {Event_Subscription} from "fusio-sdk/dist/src/generated/consumer/Event_Subscription";

@Component({
  selector: 'app-account-event-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Event_Subscription> {

  protected async getAll(query: Collection_Query): Promise<AxiosResponse<Collection<Event_Subscription>>> {
    const group = await this.factory.getClient().consumerSubscription();
    return await group.getConsumerSubscription().consumerActionEventSubscriptionGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Event_Subscription>> {
    const group = await this.factory.getClient().consumerSubscription();
    return await group.getConsumerSubscriptionBySubscriptionId(id).consumerActionEventSubscriptionGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/account/event';
  }

}
