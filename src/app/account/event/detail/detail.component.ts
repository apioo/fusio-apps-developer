import { Component, OnInit } from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {Event_Subscription} from "fusio-sdk/dist/src/generated/consumer/Event_Subscription";

@Component({
  selector: 'app-account-event-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Event_Subscription> {

}
