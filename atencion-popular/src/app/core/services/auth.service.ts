import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { of, EMPTY } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
                @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

  // tslint:disable-next-line:typedef
    login(username: string, password: string) {

        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { username, password })
            .pipe(map(response => {
                // const decodedToken = jwt_decode(user['access_token']);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                const user = {
                    token: response.access_token,
                    isAdmin: response.user.is_admin,
                    email: 'john.doe@gmail.com',
                    id: response.user.id,
                    alias: response.user.username,
                    expiration: moment().add(response.expires_in, 'minutes').toDate(),
                    fullName: response.user.name
                };

                this.localStorage.setItem('currentUser', JSON.stringify(user));
                return true;
            }));
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.removeItem('currentUser');
    }

    getCurrentUser(): any {
        // TODO: Enable after implementation
        return JSON.parse(this.localStorage.getItem('currentUser'));
    }

    /*passwordResetRequest(email: string) {
        return of(true).delay(1000);
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).delay(1000);
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).delay(1000);
    }*/
}
