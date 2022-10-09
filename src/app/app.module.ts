import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxCaptchaModule} from 'ngx-captcha';
import {HomeComponent} from './home/home.component';
import {NavigationComponent} from './navigation/navigation.component';
import {GravatarModule} from "ngx-gravatar";
import {ApiComponent} from './api/api.component';
import {BootstrapComponent} from './bootstrap/bootstrap.component';
import {SdkComponent} from './sdk/sdk.component';
import {SupportComponent} from './support/support.component';
import {AuthorizationComponent} from './authorization/authorization.component';
import {AboutComponent} from './about/about.component';
import {FusioSdkModule, FusioService as Sdk} from "ngx-fusio-sdk";
import {FusioService} from "./fusio.service";
import {ConfigBuilder} from "./config-builder";
import {AccountComponent} from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ApiComponent,
    AuthorizationComponent,
    BootstrapComponent,
    HomeComponent,
    NavigationComponent,
    SdkComponent,
    SupportComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    GravatarModule,
    NgxCaptchaModule,
    FusioSdkModule.forRoot(ConfigBuilder.build()),
  ],
  providers: [
    {provide: Sdk, useExisting: FusioService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

declare global {
  var FUSIO_URL: string | undefined;
  var FACEBOOK_KEY: string | undefined;
  var GOOGLE_KEY: string | undefined;
  var GITHUB_KEY: string | undefined;
  var RECAPTCHA_KEY: string | undefined;
}
