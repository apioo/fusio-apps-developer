import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BootstrapComponent} from "./bootstrap/bootstrap.component";
import {ApiComponent} from "./api/api.component";
import {SdkComponent} from "./sdk/sdk.component";
import {SupportComponent} from "./support/support.component";
import {AboutComponent} from "./about/about.component";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {AccountRoute, AuthorizationRoute, isAuthenticated} from "ngx-fusio-sdk";
import {AccountComponent} from "./account/account.component";

const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Developer'},
  {path: 'bootstrap', component: BootstrapComponent, title: 'Bootstrap'},
  {path: 'authorization', component: AuthorizationComponent, title: 'Authorization'},
  {path: 'api', component: ApiComponent, title: 'API'},
  {path: 'sdk', component: SdkComponent, title: 'SDK'},
  {path: 'support', component: SupportComponent, title: 'Support'},
  {path: 'about', component: AboutComponent, title: 'About'},
  {path: 'account', component: AccountComponent, canActivate: [isAuthenticated], children: AccountRoute.getAll()},
];

routes.push(...AuthorizationRoute.getAll());

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
