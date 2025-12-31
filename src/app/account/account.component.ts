import {Component} from '@angular/core';
import {AccountContainerComponent} from "ngx-fusio-sdk";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  imports: [
    RouterLink,
    RouterOutlet,
    NgClass
  ],
  styleUrls: ['./account.component.css']
})
export class AccountComponent extends AccountContainerComponent {

}
