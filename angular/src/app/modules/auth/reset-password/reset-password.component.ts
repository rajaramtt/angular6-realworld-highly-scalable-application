import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FormBuilder,  Validators, FormArray, FormGroup } from '@angular/forms';
import { appSettings } from '../../../configs/app-settings.config';
import { appToaster } from '../../../configs/app-toaster.config';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../../../core/http/user/user.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  appSettings = appSettings;
  isSubmit: boolean ;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
     this.resetPasswordForm = this.fb.group({
       password: ['',
       [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]],
       confirmPassword: ['',
       [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]],
     });

  }

  onSubmit(): boolean {
    this.isSubmit = true;
    if (this.resetPasswordForm.invalid) {
      return false;
    } else {

      let postData = Object.assign({}, this.resetPasswordForm.value);
      postData['resetToken'] = this.route.snapshot.paramMap.get('resetToken');

      this.userService.resetPassword(postData)
        .subscribe((res) => {
          if (res.status === 'success') {
            this.toasterService.pop('success', appToaster.successHead, res.message);
            this.router.navigate(['/auth/login']);
          } else {
            this.toasterService.pop('error', appToaster.errorHead, res.message);
            this.router.navigate(['/auth/login']);
          }
        });

    }
  }


}
