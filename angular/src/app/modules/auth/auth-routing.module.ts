import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
{
  path: 'login',
  component: LoginComponent,
  data: { title: 'Log In' }
},
{
  path: 'forgot-password',
  component: ForgotPasswordComponent,
  data: { title: 'Forgot Password' }
},
{
  path: 'reset-password/:resetToken',
  component: ResetPasswordComponent,
  data: { title: 'Reset password' }
},
{
  path: '404',
  component: NotFoundComponent,
  data: { title: '404' }
},
{
  path: '403',
  component: ForbiddenComponent,
  data: { title: '404' }
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  static components = [
    LoginComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    ResetPasswordComponent,
    ForbiddenComponent
  ];

}
