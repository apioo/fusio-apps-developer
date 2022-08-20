import {PageComponent} from "../page/page.component";
import {Component} from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './../page/page.component.html',
  styleUrls: ['./../page/page.component.css']
})
export class HomeComponent extends PageComponent {

  protected getId(): string {
    return '~overview';
  }

}
