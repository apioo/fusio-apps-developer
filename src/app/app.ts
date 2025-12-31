import {Component, OnInit, signal} from '@angular/core';
import {NavigationComponent} from "./navigation/navigation.component";
import {RouterOutlet} from "@angular/router";
import {VersionService} from "./version.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    NavigationComponent,
    RouterOutlet
  ],
  styleUrl: './app.css'
})
export class App implements OnInit {
  currentVersion = signal<string>('');

  constructor(private version: VersionService) { }

  ngOnInit(): void {
    this.currentVersion.set(this.version.get());
  }

}

declare global {
  var FUSIO_URL: string | undefined;
  var FUSIO_APP_KEY: string | undefined;
}
