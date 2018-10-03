import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { appSettings } from '../../../configs/app-settings.config';
import { appToaster } from '../../../configs/app-toaster.config';

import { ToasterService } from 'angular2-toaster';
import { UserService } from '../../../core/http/user/user.service';
import { StaticService } from '../../../core/services/static.service';

import { environment } from '../../../../environments/environment';

import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';


const URL  = `${environment.host}${environment.fileupload}`;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  appSettings = appSettings;
  isSubmit: boolean;
  isSuccess: boolean;
  message: string;
  public usaPhoneFormat: Array<string | RegExp>;
  public usaZipFormat: Array<string | RegExp>;
  countries: any[];
  hide: boolean;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf', 'doc']

  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private toasterService: ToasterService,
    private staticService: StaticService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.hide = true;
    this.staticService.countries()
      .subscribe((data: any) => {
        this.countries = data;
      });
    this.intilizeForm();

    this.uploader.onCompleteItem = (item, response, status, header) => {
      const responseData = JSON.parse(response);
      if (status === 200 && responseData.status === 'success') {
        this.addAttachment(responseData.name);
      }
    };
  }


  intilizeForm(): void {
    this.usaPhoneFormat = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    this.usaZipFormat = [/\d/, /\d/, /\d/, /\d/, /\d/];
    this.signupForm = this.fb.group({
      userInfo: this.fb.group({
        maritalStatus: ['single', [Validators.required]],
        gender: ['male', [Validators.required]],
        firstName: ['', [Validators.required, Validators.maxLength(100)]],
        lastName: ['', [Validators.required, Validators.maxLength(100)]],
        dob: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
        mobile: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.maxLength(250), Validators.email]],
        address: ['', [Validators.required, Validators.maxLength(250)]],
        city: ['', [Validators.required, Validators.maxLength(250)]],
        state: ['', [Validators.required, Validators.maxLength(250)]],
        country: ['', [Validators.required, Validators.maxLength(250)]],
        zip: ['', [Validators.required]],
        qualification: ['', [Validators.required, Validators.maxLength(250)]],
        profession: ['', [Validators.required, Validators.maxLength(250)]],
        nationality: ['', [Validators.required, Validators.maxLength(250)]],
      }),
      applicationInfo: this.fb.group({
        type: ['', [Validators.required]],
        notes: ['', [Validators.maxLength(1000)]],
        attachments: this.fb.array([
        ])

      }),
    });

  }

  onSubmit(): boolean {
    this.isSubmit = true;
    if (this.signupForm.invalid) {
      return false;
    } else {
      this.userService.clientSignup(this.signupForm.value)
        .subscribe((res) => {
          if (res.status === 'success') {
           // this.toasterService.pop('success', appToaster.successHead, res.message);
            // this.router.navigate(['/auth/login']);
            this.isSuccess = true;
            this.message = res.message;
          } else {
            this.toasterService.pop('error', appToaster.errorHead, res.message);
            this.router.navigate(['/client/signup']);

          }
        });

    }
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
  }

  get attachments() {
    return this.signupForm.controls.applicationInfo.get('attachments') as FormArray;
  }

  addAttachment(filename: string): void {
    this.attachments.push(
      this.fb.group({
        filename: [filename],
        displayName: [null, [Validators.required, Validators.maxLength(100)]],
      })
    );
  }


  confirm(index: number): void {

    const activeModal = this.modalService.open(ConfirmDialogComponent, {
      size: 'sm',
      backdrop: 'static',
      container: 'nb-layout',
    });

    activeModal.componentInstance.modalHeader = 'Confirmation';
    activeModal.componentInstance.modalContent = `Are you sure you want to delete this item?`;
    activeModal.result.then((data) => {
      if (data) {
        this.userService.deleteAttachment(this.attachments.value[index])
          .subscribe((res) => {
            if (res.status === 'success') {
              this.attachments.removeAt(index);
              this.toasterService.pop('success', appToaster.successHead, res.message);
            } else {
              this.toasterService.pop('error', appToaster.errorHead, res.message);
            }
          });

      }
    }, (reason) => {
    });
  }


}

