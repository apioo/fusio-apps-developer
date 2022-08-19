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
import {NavigationComponent} from './navigation/navigation.component';
import {GravatarModule} from "ngx-gravatar";
import {ApiComponent} from './api/api.component';
import {BootstrapComponent} from './bootstrap/bootstrap.component';
import {SdkComponent} from './sdk/sdk.component';
import {SupportComponent} from './support/support.component';
import {RegisterComponent} from './register/register.component';
import {ConfirmComponent as PasswordConfirm} from './password/confirm/confirm.component';
import {ResetComponent as PasswordReset} from './password/reset/reset.component';
import {AuthorizationComponent} from './authorization/authorization.component';
import {AboutComponent} from './about/about.component';
import {ActivateComponent} from "./register/activate/activate.component";
import {FactoryService, FusioSdkModule} from "ngx-fusio-sdk";
import {ListComponent as AccountAppList} from './account/app/list/list.component';
import {ModalComponent as AccountAppModal} from './account/app/modal/modal.component';
import {DetailComponent as AccountAppDetail} from './account/app/detail/detail.component';
import {ListComponent as AccountEventList} from './account/event/list/list.component';
import {ModalComponent as AccountEventModal} from './account/event/modal/modal.component';
import {DetailComponent as AccountEventDetail} from './account/event/detail/detail.component';
import {PlanComponent} from "./account/plan/plan.component";
import {ClientService} from "./client.service";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ActivateComponent,
    AccountAppList,
    AccountAppModal,
    AccountAppDetail,
    AccountEventList,
    AccountEventModal,
    AccountEventDetail,
    PlanComponent,
    ProfileComponent,
    SecurityComponent,
    ApiComponent,
    AuthorizationComponent,
    BootstrapComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    NavigationComponent,
    PasswordConfirm,
    PasswordReset,
    RegisterComponent,
    SdkComponent,
    SupportComponent,
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
    FusioSdkModule,
  ],
  providers: [
    {provide: FactoryService, useExisting: ClientService}
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
