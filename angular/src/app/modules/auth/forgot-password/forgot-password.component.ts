import { UserService } from '../../../core/http/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { appSettings } from '../../../configs/app-settings.config';
import { appToaster } from '../../../configs/app-toaster.config';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  appSettings: any;
  isSubmit: boolean;
  isSuccess: boolean;
  message: string;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.appSettings = appSettings;
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.max(250), Validators.email]],
    });

  }
   // convenience getter for easy access to form fields
      get formFields() { return this.forgotPasswordForm.controls; }

  onSubmit(): boolean {
    this.isSubmit = true;
    if (this.forgotPasswordForm.invalid) {
      return false;
    } else {
      this.userService.forgotPassword(this.forgotPasswordForm.value)
        .subscribe((res) => {
          if (res.status === 'success') {
            this.isSuccess = true;
            this.message = res.message;
            // this.toasterService.pop('success', appToaster.successHead, res.message);
          } else {
            this.toasterService.pop('error', appToaster.errorHead, res.message);
            this.router.navigate(['/client/forgot-password']);
          }
        });

    }
  }
}
