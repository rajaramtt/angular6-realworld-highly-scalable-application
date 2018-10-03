import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { catchError, map, tap, debounce } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Login } from '../../shared/models/login.model';
const credentialsKey = 'currentUser';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) {
    }

    login(loginData: Login): Observable<any> {
        const href = `${ environment.login }`;
        return this.http.post<any>(href, loginData).pipe(
            tap(
                function (data) {
                    if (data.status === 'success') {
                        const storage = loginData.remember ? localStorage : sessionStorage;
                        storage.setItem(credentialsKey, JSON.stringify(data));
                    }
                    return data;
                }
            )
        );
    }

    logout(): Observable<boolean> {
        sessionStorage.removeItem(credentialsKey);
        localStorage.removeItem(credentialsKey);
        return observableOf(true);
    }

    getUserInfo(): Observable<any> {
        const savedCredentials = this.getUser();
        return observableOf(savedCredentials);
    }

    isLogin() {
        if (localStorage.getItem(credentialsKey) || sessionStorage.getItem(credentialsKey)) {
            return true;
        }
        return false;

    }

    getToken() {
        const savedCredentials = this.getUser();
        return savedCredentials && savedCredentials['token'];
    }

    getUserRole(): Observable<any> {
        const savedCredentials =  this.getUser();
        return observableOf(savedCredentials['role']);
    }

    getUserType() {
        const savedCredentials =  this.getUser();
        if ( this.isLogin() ) {
            return savedCredentials['role'];
        } else {
            return false;
        }


    }

    private getUser() {
        const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
         return JSON.parse( savedCredentials );
    }

}

