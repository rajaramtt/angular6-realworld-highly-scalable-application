import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, debounce } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { FortgotPassword } from '../../../shared/models/fortgot-password';
import { ResetPassword } from '../../../shared/models/reset-password';
import { Attachments } from '../../../shared/models/attachments.model';
import { User } from '../../../shared/models/user.model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  forgotPassword(fotgotData: FortgotPassword): Observable<any> {
    const href = `${ environment.fotgotPassword }`;
    return this.http.post<any>(href, fotgotData);
}


resetPassword(resetData: ResetPassword): Observable<any> {
  const href = `${ environment.resetPassword }`;
  return this.http.post<any>(href, resetData);
}

deleteAttachment(attachment: Attachments): Observable<any> {
  const href = `${ environment.deleteAttachment }`;
  return this.http.post<any>(href, attachment);
}

clientSignup(clientData: User): Observable<any> {
  const href = `${ environment.clientSignup }`;
  return this.http.post<any>(href, clientData);
}



}
