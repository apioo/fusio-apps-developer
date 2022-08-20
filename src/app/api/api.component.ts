import { Component, OnInit } from '@angular/core';
import {PageComponent} from "../page/page.component";

@Component({
  selector: 'app-api',
  templateUrl: './../page/page.component.html',
  styleUrls: ['./../page/page.component.css']
})
export class ApiComponent extends PageComponent {

  protected getId(): string {
    return '~api';
  }

}
