import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './ensureModuleLoadedOnceGuard';
import { AnalyticsService } from './services/analytics.service';

const socialLinks = [
  {
    url: '',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: '',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: '',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];


export const NB_CORE_PROVIDERS = [
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  declarations: [],
})
export class TemplateCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: TemplateCoreModule) {
    throwIfAlreadyLoaded(parentModule, 'TemplateCoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: TemplateCoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
