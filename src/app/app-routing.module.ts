import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {HttpClientComponent} from './httpclient/http-client.component';

const routes: Routes =  [
  {path: '', component: LoginComponent,},
  {path: 'home', component: HomeComponent},
  {path: 'http', component: HttpClientComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
