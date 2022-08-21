import {Injectable} from '@angular/core';
import {FusioService as Sdk} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/consumer/Client";
import {CredentialsInterface, TokenStoreInterface} from "sdkgen-client";

@Injectable({
  providedIn: 'root'
})
export class FusioService extends Sdk<Client> {

  protected newClient(baseUrl: string, credentials: CredentialsInterface | null | undefined, tokenStore: TokenStoreInterface | undefined): Client {
    return new Client(baseUrl, credentials, tokenStore);
  }

}
