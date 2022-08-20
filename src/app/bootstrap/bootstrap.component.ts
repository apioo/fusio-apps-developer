import { Component, OnInit } from '@angular/core';
import {PageComponent} from "../page/page.component";

@Component({
  selector: 'app-bootstrap',
  templateUrl: './../page/page.component.html',
  styleUrls: ['./../page/page.component.css']
})
export class BootstrapComponent extends PageComponent {

  protected getId(): string {
    return '~getting-started';
  }

}
