import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {ProfileComponent} from "./account/profile/profile.component";
import {SecurityComponent} from "./account/security/security.component";
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
import {PlanComponent} from "./account/plan/plan.component";
import {ListComponent as AppList} from "./account/app/list/list.component";
import {ListComponent as EventList} from "./account/event/list/list.component";
import {AuthenticationGuard} from "ngx-fusio-sdk";

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
  { path: 'account/app', component: AppList, canActivate: [AuthenticationGuard] },
  { path: 'account/event', component: EventList, canActivate: [AuthenticationGuard] },
  { path: 'account/plan', component: PlanComponent, canActivate: [AuthenticationGuard] },
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
