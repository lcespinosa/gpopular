import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as moment from 'moment';

import { AuthenticationService } from '../services/auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private notificationService: NzNotificationService,
                private authService: AuthenticationService) { }

  // tslint:disable-next-line:typedef
    canActivate() {
        const user = this.authService.getCurrentUser();

        if (user && user.expiration) {

            if (moment() < moment(user.expiration)) {
                return true;
            } else {
                this.notificationService.info('Sesión de usuario', 'Su sesión de usuario ha expirado');
                this.router.navigate(['auth/login']);
                return false;
            }
        }

        this.router.navigate(['auth/login']);
        return false;
    }
}
