import {Injectable} from '@angular/core';
import {LocationStrategy} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  providers: Array<Provider> = [];

  constructor(private location: LocationStrategy) {
    this.providers = this.getProviders();
  }

  public generateUrl(name: string): string {
    const provider = this.getProviderByName(name);
    if (!provider) {
      throw new Error('Login provider does not exist');
    }

    const state = this.generateState();
    const path = this.location.prepareExternalUrl('/login/' + provider.name);
    const redirectUrl = location.origin + path;

    let params: Record<string, string> = {};
    for (const [key, value] of Object.entries(provider.params)) {
      if (key === 'client_id') {
        params[value] = provider.key;
      } else if (key === 'redirect_uri') {
        params[value] = redirectUrl;
      } else if (key === 'state') {
        params[value] = state;
      } else {
        params[key] = value;
      }
    }

    sessionStorage.setItem(this.getSessionKey(provider.name), JSON.stringify({
      redirectUri: redirectUrl,
      state: state,
    }));

    return provider.url + '?' + this.buildQueryString(params);
  }

  public verifyRequest(name: string, state: string): Verification {
    const data = sessionStorage.getItem(this.getSessionKey(name));
    if (!data) {
      throw new Error('The given provider was not requested');
    }

    const provider = this.getProviderByName(name);
    if (!provider) {
      throw new Error('The given provider does not exist');
    }

    const session = JSON.parse(data);
    if (session.state !== state) {
      throw new Error('The provided state does not match');
    }

    return {
      clientId: provider.key,
      redirectUri: session.redirectUri,
    };
  }

  public getProviders(): Array<Provider> {
    const providers: Array<Provider> = [];

    const github = this.getProviderKey(ProviderType.github);
    if (github) {
      providers.push({
        name: 'GitHub',
        icon: 'github',
        key: github,
        url: 'https://github.com/login/oauth/authorize',
        params: {
          client_id: 'client_id',
          redirect_uri: 'redirect_uri',
          state: 'state',
          response_type: 'code',
        }
      })
    }

    const google = this.getProviderKey(ProviderType.google);
    if (google) {
      providers.push({
        name: 'Google',
        icon: 'google',
        key: google,
        url: 'https://accounts.google.com/o/oauth2/v2/auth',
        params: {
          client_id: 'client_id',
          redirect_uri: 'redirect_uri',
          state: 'state',
          response_type: 'code',
          scope: 'openid profile',
        }
      })
    }

    const facebook = this.getProviderKey(ProviderType.facebook);
    if (facebook) {
      providers.push({
        name: 'Facebook',
        icon: 'facebook',
        key: facebook,
        url: 'https://www.facebook.com/v14.0/dialog/oauth',
        params: {
          client_id: 'client_id',
          redirect_uri: 'redirect_uri',
          state: 'state',
          response_type: 'code',
        }
      })
    }

    return providers;
  }

  private getProviderByName(name: string): Provider|undefined {
    return this.providers.find((provider) => {
      return provider.name === name;
    })
  }

  private getProviderKey(type: ProviderType): string|undefined {
    switch (type) {
      case ProviderType.github:
        return typeof GITHUB_KEY === 'string' && GITHUB_KEY !== '${PROVIDER_GITHUB_KEY}' ? GITHUB_KEY : undefined;
      case ProviderType.google:
        return typeof GOOGLE_KEY === 'string' && GOOGLE_KEY !== '${PROVIDER_GOOGLE_KEY}' ? GOOGLE_KEY : undefined;
      case ProviderType.facebook:
        return typeof FACEBOOK_KEY === 'string' && FACEBOOK_KEY !== '${PROVIDER_FACEBOOK_KEY}' ? FACEBOOK_KEY : undefined;
    }
    return;
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2);
  }

  private buildQueryString(params: Record<string, string>): string {
    return Object.keys(params).map((key) => {
      return key + '=' + encodeURIComponent(params[key])
    }).join('&');
  }

  private getSessionKey(providerName: string): string {
    return 'fusio_login_' + providerName;
  }

}

export interface Provider {
  name: string,
  icon: string,
  key: string
  url: string,
  params: Record<string, string>
}

export interface Verification {
  clientId: string,
  redirectUri: string,
}

enum ProviderType {
  github,
  google,
  facebook,
}
