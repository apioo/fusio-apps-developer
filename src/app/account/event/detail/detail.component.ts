import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {EventSubscription} from "fusio-sdk/dist/src/generated/consumer/EventSubscription";

@Component({
  selector: 'app-account-event-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<EventSubscription> {

}
