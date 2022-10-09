import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  items: Array<Item> = [{
    id: 'account',
    link: '/account',
    name: 'Account',
  }, {
    id: 'security',
    link: '/account/security',
    name: 'Security',
  }, {
    id: 'app',
    link: '/account/app',
    name: 'Apps',
  }, {
    id: 'event',
    link: '/account/event',
    name: 'Events',
  }, {
    id: 'subscription',
    link: '/account/subscription',
    name: 'Subscriptions',
  }];

  active: string = 'account';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.items.forEach((item) => {
        if (this.router.url.startsWith(item.link)) {
          this.active = item.id;
        }
      });
    })
  }

}

interface Item {
  id: string
  link: string
  name: string
}
