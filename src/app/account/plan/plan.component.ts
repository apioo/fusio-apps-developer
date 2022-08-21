import {Component, OnInit} from '@angular/core';
import {Plan} from "fusio-sdk/dist/src/generated/consumer/Plan";
import {LocationStrategy} from "@angular/common";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import axios from "axios";
import {FusioService} from "../../fusio.service";

@Component({
  selector: 'app-account-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  plans?: Array<Plan>
  response?: Message;

  provider = 'stripe';
  currencyCode = 'USD';

  constructor(private fusio: FusioService, private location: LocationStrategy) { }

  async ngOnInit(): Promise<void> {
    const group = await this.fusio.getClient().consumerPlan();
    const response = await group.getConsumerPlan().consumerActionPlanGetAll({count: 1024});
    this.plans = response.data.entry;
  }

  async doBillingPortal() {
    try {
      const group = await this.fusio.getClient().consumerPayment();
      const response = await group.getConsumerPaymentByProviderPortal(this.provider).consumerActionPaymentPortal();

      if (response.data.redirectUrl) {
        location.href = response.data.redirectUrl;
      } else {
        throw new Error('You can only visit the billing portal once you have successfully purchased a subscription');
      }
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

  async doPurchase(plan: Plan) {
    try {
      const path = this.location.prepareExternalUrl('/account');
      const redirectUrl = location.origin + path;

      const group = await this.fusio.getClient().consumerPayment();
      const response = await group.getConsumerPaymentByProviderCheckout(this.provider).consumerActionPaymentCheckout({
        planId: plan.id,
        returnUrl: redirectUrl,
      });

      if (response.data.approvalUrl) {
        location.href = response.data.approvalUrl;
      }
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
