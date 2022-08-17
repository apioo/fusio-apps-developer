import { Component, OnInit } from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {FactoryService} from "../factory.service";
import axios from "axios";
import {Page} from "fusio-sdk/dist/src/generated/consumer/Page";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export abstract class PageComponent implements OnInit {

  response?: Message;
  page?: Page
  content?: SafeHtml

  constructor(protected factory: FactoryService, protected sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    try {
      const group = await this.factory.getClientAnonymous().consumerPage();
      const response = await group.getConsumerPageByPageId(this.getId()).consumerActionPageGet();

      this.page = response.data;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.page.content || '');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

  protected abstract getId(): string;

}
