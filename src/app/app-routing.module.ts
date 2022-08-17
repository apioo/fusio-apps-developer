import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from "./authentication.guard";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {ProfileComponent} from "./account/profile/profile.component";
import {SecurityComponent} from "./account/security/security.component";
import {GrantsComponent} from "./account/grants/grants.component";
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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bootstrap', component: BootstrapComponent },
  { path: 'api', component: ApiComponent },
  { path: 'sdk', component: SdkComponent },
  { path: 'support', component: SupportComponent },
  { path: 'account', component: ProfileComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/security', component: SecurityComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/grants', component: GrantsComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/apps', component: AppsComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/events', component: EventsComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/plans', component: PlansComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/contracts', component: ContractsComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/invoices', component: InvoicesComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
