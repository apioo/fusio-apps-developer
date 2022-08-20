import { Component, OnInit } from '@angular/core';
import {PageComponent} from "../page/page.component";

@Component({
  selector: 'app-sdk',
  templateUrl: './../page/page.component.html',
  styleUrls: ['./../page/page.component.css']
})
export class SdkComponent extends PageComponent {

  protected getId(): string {
    return '~sdk';
  }

}
