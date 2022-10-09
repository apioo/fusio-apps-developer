import {Config, Provider} from "ngx-fusio-sdk/lib/config/config";

export class ConfigBuilder {

  public static build(): Config {
    let baseUrl = FUSIO_URL;
    if (!baseUrl) {
      throw new Error('No base url configured, please provide a variable "FUSIO_URL" containing the Fusio base url');
    }

    return {
      baseUrl: baseUrl,
      providers: ConfigBuilder.getProviders(),
      recaptcha: ConfigBuilder.getRecaptchaKey(),
    }
  }

  private static getProviders(): Array<Provider> {
    const providers: Array<Provider> = [];

    const github = ConfigBuilder.getProviderKey(ProviderType.github);
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

    const google = ConfigBuilder.getProviderKey(ProviderType.google);
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

    const facebook = ConfigBuilder.getProviderKey(ProviderType.facebook);
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

  private static getProviderKey(type: ProviderType): string|undefined {
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

  private static getRecaptchaKey(): string|undefined {
    return typeof RECAPTCHA_KEY === 'string' && RECAPTCHA_KEY !== '${RECAPTCHA_KEY}' ? RECAPTCHA_KEY : undefined;
  }

}

enum ProviderType {
  github,
  google,
  facebook,
}
