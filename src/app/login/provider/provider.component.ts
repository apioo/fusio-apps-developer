import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {Message} from "fusio-sdk/dist/src/generated/consumer/Message";
import {ClientService} from "../../client.service";
import {SessionTokenStore} from "sdkgen-client";
import {AccessToken} from "sdkgen-client/dist/src/AccessToken";
import {ActivatedRoute, Router} from "@angular/router";
import {ProviderService} from "../../provider.service";

@Component({
  selector: 'app-login-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  response?: Message;

  constructor(private client: ClientService, private router: Router, protected route: ActivatedRoute, private provider: ProviderService) { }

  async ngOnInit(): Promise<void> {
    const provider = this.route.snapshot.paramMap.get('provider');
    const code = this.route.snapshot.queryParams['code'];
    const state = this.route.snapshot.queryParams['state'];

    if (provider && code) {
      await this.obtainAccessToken(provider, code, state);
    } else {
      this.response = {
        success: false,
        message: 'Missing credentials',
      };
    }
  }

  private async obtainAccessToken(providerName: string, code: string, state: string) {
    try {
      const verification = this.provider.verifyRequest(providerName, state);

      const group = await this.client.getClientAnonymous().consumerUser();
      const response = await group.getConsumerProviderByProvider(providerName).consumerActionUserProvider({
        code: code,
        clientId: verification.clientId,
        redirectUri: verification.redirectUri,
      });

      if (!response.data.token) {
        throw new Error('Could not obtain access token');
      }

      const token: AccessToken = {
        token_type: 'bearer',
        access_token: response.data.token,
        expires_in: response.data.expires_in || 0,
        refresh_token: response.data.refresh_token || '',
        scope: response.data.scope || '',
      };

      const store = new SessionTokenStore();
      store.persist(token);

      this.router.navigate(['/account']).then(() => {
        location.reload();
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        this.response = {
          success: false,
          message: String(error),
        };
      }
    }
  }

}
