import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about?: About;

  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    if (!FUSIO_URL) {
      return;
    }

    this.http.get<About>(FUSIO_URL).subscribe((about) => {
      this.about = about;
    });
  }

}

interface About {
  apiVersion: string,
  title: string,
  categories: Array<string>,
  scopes: Array<string>,
  apps: Apps,
  links: Array<Link>,
}

interface Apps {
  [key: string]: string
}

interface Link {
  rel: string,
  href: string,
}
