import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  constructor(private http: HttpClient) {
  }

  countries(): Observable<any> {
    return this.http.get(environment.countires);
}

}
