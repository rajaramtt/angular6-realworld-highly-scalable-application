import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ConfirmDialogComponent ],
  entryComponents: [ ConfirmDialogComponent ]

})
export class SharedModule { }
