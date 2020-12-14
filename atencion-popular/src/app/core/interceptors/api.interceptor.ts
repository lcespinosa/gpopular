import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private notificationService: NzNotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next
            .handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {

                }, (error) => {
                    console.log(error);
                    if (error.status === 0) {
                      this.notificationService.error('Servidor', 'Parece que no tenemos conexión con el servidor.');
                    }
                })
            );
    }
}
