import { Component } from '@angular/core';
import {VersionService} from "./version.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'developer';
  currentVersion = '';

  constructor(private version: VersionService) { }

  ngOnInit(): void {
    this.currentVersion = this.version.get();
  }

}
