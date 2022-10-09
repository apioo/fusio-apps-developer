import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BootstrapComponent} from "./bootstrap/bootstrap.component";
import {ApiComponent} from "./api/api.component";
import {SdkComponent} from "./sdk/sdk.component";
import {SupportComponent} from "./support/support.component";
import {AboutComponent} from "./about/about.component";
import {
  AccountComponent,
  ActivateComponent,
  AppList,
  AuthenticationGuard,
  ConfirmComponent,
  EventList,
  LoginComponent,
  LogoutComponent,
  ProviderComponent,
  RegisterComponent,
  ResetComponent,
  SecurityComponent,
  SubscriptionComponent
} from "ngx-fusio-sdk";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {AccountComponent as AccountContainer} from "./account/account.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'bootstrap', component: BootstrapComponent},
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'api', component: ApiComponent},
  {path: 'sdk', component: SdkComponent},
  {path: 'support', component: SupportComponent},
  {path: 'about', component: AboutComponent},
  {
    path: 'account', component: AccountContainer, canActivate: [AuthenticationGuard], children: [
      {path: '', component: AccountComponent, canActivate: [AuthenticationGuard]},
      {path: 'security', component: SecurityComponent, canActivate: [AuthenticationGuard]},
      {path: 'app', component: AppList, canActivate: [AuthenticationGuard]},
      {path: 'app/:id', component: AppList, canActivate: [AuthenticationGuard]},
      {path: 'event', component: EventList, canActivate: [AuthenticationGuard]},
      {path: 'event/:id', component: EventList, canActivate: [AuthenticationGuard]},
      {path: 'subscription', component: SubscriptionComponent, canActivate: [AuthenticationGuard]},
    ]
  },

  {path: 'login', component: LoginComponent},
  {path: 'login/:provider', component: ProviderComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register/activate/:token', component: ActivateComponent},
  {path: 'password/reset', component: ResetComponent},
  {path: 'password/confirm/:token', component: ConfirmComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
