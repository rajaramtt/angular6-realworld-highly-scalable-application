import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { appSettings } from '../../../configs/app-settings.config';

@Component({
  selector: 'app-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  appSettings = appSettings;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
   ) {
  }

  goToHome() {
    const userType = this.authenticationService.getUserType();
    if ( !userType ) {
      this.router.navigate(['/auth/login']);
    } else if (userType === 'client') {
      this.router.navigate(['/client/dashboard']);
    }
  }
}
