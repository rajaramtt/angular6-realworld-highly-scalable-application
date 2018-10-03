import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { LoggerService } from '../services/logger.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { appToaster } from '../../configs/app-toaster.config';
import { ToasterService } from 'angular2-toaster';


@Injectable()
export class ClientAuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private logger: LoggerService,
    private toasterService: ToasterService,
    private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.chekUser(route, state);

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.chekUser(route, state);
  }

  private chekUser(route, state): boolean {
    const userType = this.authenticationService.getUserType();
    const isLogin = this.authenticationService.isLogin();
    if (userType === 'client' && isLogin) {
      return true;
    } else if (isLogin) {
      this.toasterService.pop('error', appToaster.errorHead, 'Unauthorized: Access is denied');
      // this.router.navigate(['/client/dashboard']);

      this.router.navigateByUrl('/auth/403');
      return false;
    } else {

      this.logger.log('Not authenticated, redirecting...');
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}

