import { Injectable } from '@angular/core';
import {ApiService as Sdk} from "ngx-fusio-sdk";
import {CredentialsInterface} from "sdkgen-client";
import {Client} from "fusio-sdk/dist/Client";

@Injectable({
  providedIn: 'root'
})
export class ApiService extends Sdk<Client> {

  protected newClient(baseUrl: string, credentials: CredentialsInterface | null | undefined): Client {
    return new Client(baseUrl, credentials);
  }

}
