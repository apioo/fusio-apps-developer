import {Component} from '@angular/core';
import {Event} from "fusio-sdk/dist/src/generated/consumer/Event";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/consumer/Client";
import {Event_Subscription} from "fusio-sdk/dist/src/generated/consumer/Event_Subscription";
import {Event_Subscription_Create} from "fusio-sdk/dist/src/generated/consumer/Event_Subscription_Create";
import {Event_Subscription_Update} from "fusio-sdk/dist/src/generated/consumer/Event_Subscription_Update";

@Component({
  selector: 'app-account-event-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Event_Subscription> {

  events?: Array<Event>;

  override async ngOnInit(): Promise<void> {
    const group = await this.fusio.getClient().consumerEvent();
    const response = await group.getConsumerEvent().consumerActionEventGetAll({count: 1024});
    this.events = response.data.entry;
  }

  protected async create(entity: Event_Subscription): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().consumerSubscription();
    return await group.getConsumerSubscription().consumerActionEventSubscriptionCreate(<Event_Subscription_Create> entity);
  }

  protected async update(entity: Event_Subscription): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().consumerSubscription();
    return await group.getConsumerSubscriptionBySubscriptionId('' + entity.id).consumerActionEventSubscriptionUpdate(<Event_Subscription_Update> entity);
  }

  protected async delete(entity: Event_Subscription): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().consumerSubscription();
    return await group.getConsumerSubscriptionBySubscriptionId('' + entity.id).consumerActionEventSubscriptionDelete();
  }

  protected newEntity(): Event_Subscription {
    return {
      event: '',
      endpoint: '',
    };
  }

}
