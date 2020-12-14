import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {ReasonType} from '../../models/reason_type';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReasonTypeService {

  url = '/nomenclature/reason_types';

  constructor(private http: HttpClient) { }

  getReasonTypes(): Observable<ReasonType[]> {
    return this.http.get<ReasonType[]>(environment.apiUrl + this.url)
      .pipe(
        tap(reason => console.log('fetched reason')),
      );
  }

  getReasonType(id: number): Observable<ReasonType> {
    return this.http.get<ReasonType>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`fetched reason id=${id}`)),
      );
  }

  addReasonType(reason: ReasonType): Observable<ReasonType> {
    return this.http.post<ReasonType>(environment.apiUrl + this.url, reason, httpOptions)
      .pipe(
        tap((r: ReasonType) => console.log(`added reason w/ id=${r.id}`))
      );
  }

  updateReasonType(id: number, reason: ReasonType): Observable<ReasonType> {
    return this.http.put<ReasonType>(environment.apiUrl + this.url + `/${id}`, reason, httpOptions)
      .pipe(
        tap(_ => console.log(`updated reason id=${id}`)),
      );
  }

  deleteReasonType(id: number): Observable<ReasonType> {
    return this.http.delete<ReasonType>(environment.apiUrl + this.url + `/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted reason ${id}`)),
      );
  }
}
