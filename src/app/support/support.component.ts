import { Component, OnInit } from '@angular/core';
import {PageComponent} from "../page/page.component";

@Component({
  selector: 'app-support',
  templateUrl: './../page/page.component.html',
  styleUrls: ['./../page/page.component.css']
})
export class SupportComponent extends PageComponent {

  protected getId(): string {
    return '~support';
  }

}
