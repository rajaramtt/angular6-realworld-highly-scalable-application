import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { Router } from '@angular/router';
import { appSettings } from '../../../configs/app-settings.config';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {

  appSettings = appSettings;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
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
