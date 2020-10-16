import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cpopular } from '../../models/cpopulars';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CpopularsService {

  url = '/localization/cpopulars';

  constructor(private http: HttpClient) { }

  getCpopulars(): Observable<Cpopular[]> {
    return this.http.get<Cpopular[]>(environment.apiUrl + this.url)
        .pipe(
            tap(cpopular => console.log('fetched consejos')),
        );
  }
}
