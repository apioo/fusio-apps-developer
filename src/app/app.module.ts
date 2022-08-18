import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxCaptchaModule} from 'ngx-captcha';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {ProfileComponent} from './account/profile/profile.component';
import {SecurityComponent} from './account/security/security.component';
import {EventsComponent} from './account/events/events.component';
import {PlansComponent} from './account/plans/plans.component';
import {ContractsComponent} from './account/contracts/contracts.component';
import {InvoicesComponent} from './account/invoices/invoices.component';
import {AppsComponent} from "./account/apps/apps.component";
import {NavigationComponent} from './navigation/navigation.component';
import {GravatarModule} from "ngx-gravatar";
import {ApiComponent} from './api/api.component';
import {BootstrapComponent} from './bootstrap/bootstrap.component';
import {SdkComponent} from './sdk/sdk.component';
import {SupportComponent} from './support/support.component';
import {RegisterComponent} from './register/register.component';
import {ConfirmComponent} from './password/confirm/confirm.component';
import {ResetComponent} from './password/reset/reset.component';
import {MessageComponent} from "./shared/message/message.component";
import {AuthorizationComponent} from './authorization/authorization.component';
import {AboutComponent} from './about/about.component';
import {ActivateComponent} from "./register/activate/activate.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    AppsComponent,
    ProfileComponent,
    SecurityComponent,
    EventsComponent,
    PlansComponent,
    ContractsComponent,
    InvoicesComponent,
    NavigationComponent,
    ApiComponent,
    BootstrapComponent,
    SdkComponent,
    SupportComponent,
    RegisterComponent,
    ActivateComponent,
    ConfirmComponent,
    ResetComponent,
    MessageComponent,
    AuthorizationComponent,
    AboutComponent,
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
  ],
  providers: [],
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
