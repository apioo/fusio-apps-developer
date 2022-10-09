import {Component} from '@angular/core';
import {PageComponent} from "../page/page.component";

@Component({
  selector: 'app-authorization',
  templateUrl: './../page/page.component.html',
  styleUrls: ['./../page/page.component.css']
})
export class AuthorizationComponent extends PageComponent {

  protected getId(): string {
    return '~authorization';
  }

}
