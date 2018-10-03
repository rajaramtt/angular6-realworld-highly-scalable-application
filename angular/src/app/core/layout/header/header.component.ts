import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { ToasterService } from 'angular2-toaster';

import { AuthenticationService } from '../../authentication/authentication.service';
import { AnalyticsService } from '../../services/analytics.service';

import { appSettings } from '../../../configs/app-settings.config';
import { appToaster } from '../../../configs/app-toaster.config';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  user: any;
  appSettings: any;
  userMenu = [{ title: 'Profile' }, { title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private router: Router,
              private menuService: NbMenuService,
              private toasterService: ToasterService,
              private authenticationService: AuthenticationService,
              private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.appSettings = appSettings;
    this.authenticationService.getUserInfo()
      .subscribe((users: any) => this.user = users);

      this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });


  }

  onContecxtItemSelection(title) {
    if( title === 'Log out' ) {
      this.logout();
    }
    }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }


  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  logout() {
    this.authenticationService.getUserRole().subscribe((userType) => {
    let logOutURL;
    console.log(userType);
    this.authenticationService.logout().subscribe((res) => {
      // if (userType === 'client') {
      //   logOutURL = '/client/login';
      // }
      logOutURL = '/auth/login';
      this.toasterService.pop('success', appToaster.successHead, appToaster.logoutSucess);
      //Raja Developer Imp Note: 
      // for aviod  ExpressionChangedAfterItHasBeenCheckedError page reloading.
      window.location.reload();
      this.router.navigate([logOutURL], { replaceUrl: true });
    });
  });

  }


}
