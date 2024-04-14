import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ErrorService} from "ngx-fusio-sdk";
import {ApiService} from "../api.service";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {ConsumerPage} from "fusio-sdk/dist/ConsumerPage";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export abstract class PageComponent implements OnInit {

  response?: CommonMessage
  page?: ConsumerPage
  content?: SafeHtml

  constructor(private fusio: ApiService, private error: ErrorService, protected sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    try {
      this.page = await this.fusio.getClientAnonymous().consumer().page().get(this.getId());
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.page?.content || '');
      this.response = undefined;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  protected abstract getId(): string;

}
