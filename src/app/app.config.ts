import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {ApiService} from "./api.service";

import {routes} from './app.routes';
import {ConfigBuilder} from "./config-builder";
import {provideMarkdown} from "ngx-markdown";
import {ApiService as SDK, FUSIO_CONFIG} from "ngx-fusio-sdk";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideMarkdown(),
    {
      provide: SDK,
      useExisting: ApiService
    },
    {
      provide: FUSIO_CONFIG,
      useValue: ConfigBuilder.build()
    }
  ]
};
