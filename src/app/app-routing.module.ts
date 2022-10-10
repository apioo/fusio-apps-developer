import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BootstrapComponent} from "./bootstrap/bootstrap.component";
import {ApiComponent} from "./api/api.component";
import {SdkComponent} from "./sdk/sdk.component";
import {SupportComponent} from "./support/support.component";
import {AboutComponent} from "./about/about.component";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {RouteBuilder} from "ngx-fusio-sdk";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'bootstrap', component: BootstrapComponent},
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'api', component: ApiComponent},
  {path: 'sdk', component: SdkComponent},
  {path: 'support', component: SupportComponent},
  {path: 'about', component: AboutComponent},
];

routes.push(...RouteBuilder.getRoutes());

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
