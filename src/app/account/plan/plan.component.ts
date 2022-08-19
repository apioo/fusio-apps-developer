import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../client.service";
import {Plan} from "fusio-sdk/dist/src/generated/consumer/Plan";
import {LocationStrategy} from "@angular/common";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import axios from "axios";

@Component({
  selector: 'app-account-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  plans?: Array<Plan>
  response?: Message;

  private provider = 'stripe';

  constructor(private client: ClientService, private location: LocationStrategy) { }

  async ngOnInit(): Promise<void> {
    const group = await this.client.getClient().consumerPlan();
    const response = await group.getConsumerPlan().consumerActionPlanGetAll({count: 1024});
    this.plans = response.data.entry;
  }

  async doBillingPortal() {
    try {
      const group = await this.client.getClient().consumerPayment();
      const response = await group.getConsumerPaymentByProviderPortal(this.provider).consumerActionPaymentPortal();

      if (response.data.redirectUrl) {
        location.href = response.data.redirectUrl;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

  async doPurchase(plan: Plan) {
    try {
      const group = await this.client.getClient().consumerPayment();
      const response = await group.getConsumerPaymentByProviderCheckout(this.provider).consumerActionPaymentCheckout({
        planId: plan.id,
        returnUrl: this.location.prepareExternalUrl('/account'),
      });

      if (response.data.approvalUrl) {
        location.href = response.data.approvalUrl;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

}
