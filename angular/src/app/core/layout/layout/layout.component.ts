import { Component, OnDestroy, ChangeDetectionStrategy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { AuthenticationService } from '../../authentication/authentication.service';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

// TODO: move layouts into the framework
@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./layout.component.scss'],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnDestroy {

  private alive = true;

  currentTheme: string;

  constructor(
    protected themeService: NbThemeService,
    private authenticationService: AuthenticationService,
    private menuService: NbMenuService,
  ) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });

    this.menuService.onSubmenuToggle().subscribe(obs => {
      if (obs.item.expanded) {
       obs.item.subMenuHeight = (obs.item.children.length * 40); 
      }
     });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
