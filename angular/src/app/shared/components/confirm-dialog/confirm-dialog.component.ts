import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],

})
export class ConfirmDialogComponent {

  modalHeader: string;
  modalContent = ``;

  constructor(private activeModal: NgbActiveModal) { }

  close(): void {
    this.activeModal.close(false);
  }

  confirm(): void {
    this.activeModal.close(true);
  }
}

