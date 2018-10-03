
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ThemeModule } from '../../core/theme.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule,
  ],
  declarations: [AuthRoutingModule.components ],
  providers: []
})
export class AuthModule { }
