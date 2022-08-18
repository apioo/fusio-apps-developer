import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from "./authentication.guard";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {ProfileComponent} from "./account/profile/profile.component";
import {SecurityComponent} from "./account/security/security.component";
import {AppsComponent} from "./account/apps/apps.component";
import {EventsComponent} from "./account/events/events.component";
import {PlansComponent} from "./account/plans/plans.component";
import {ContractsComponent} from "./account/contracts/contracts.component";
import {InvoicesComponent} from "./account/invoices/invoices.component";
import {BootstrapComponent} from "./bootstrap/bootstrap.component";
import {ApiComponent} from "./api/api.component";
import {SdkComponent} from "./sdk/sdk.component";
import {SupportComponent} from "./support/support.component";
import {RegisterComponent} from "./register/register.component";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {AboutComponent} from "./about/about.component";
import {ActivateComponent} from "./register/activate/activate.component";
import {ResetComponent} from "./password/reset/reset.component";
import {ConfirmComponent} from "./password/confirm/confirm.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bootstrap', component: BootstrapComponent },
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'api', component: ApiComponent },
  { path: 'sdk', component: SdkComponent },
  { path: 'support', component: SupportComponent },
  { path: 'about', component: AboutComponent },
  { path: 'account', component: ProfileComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/security', component: SecurityComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/apps', component: AppsComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/events', component: EventsComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/plans', component: PlansComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/contracts', component: ContractsComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/invoices', component: InvoicesComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/activate/:token', component: ActivateComponent },
  { path: 'password/reset', component: ResetComponent },
  { path: 'password/confirm/:token', component: ConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
