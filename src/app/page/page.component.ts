import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {Page} from "fusio-sdk/dist/src/generated/consumer/Page";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ConsumerService, ErrorService} from "ngx-fusio-sdk";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export abstract class PageComponent implements OnInit {

  response?: Message;
  page?: Page
  content?: SafeHtml

  constructor(private consumer: ConsumerService, private error: ErrorService, protected sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    try {
      this.page = await this.consumer.getClientAnonymous().page().get(this.getId());
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.page.content || '');
      this.response = undefined;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  protected abstract getId(): string;

}
