import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cpopular } from '../../models/cpopulars';
import {environment} from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

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

  getCpopular(id: number): Observable<Cpopular> {
    return this.http.get<Cpopular>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`fetched consejo id=${id}`)),
      );
  }

  addCpopular(cpopular: Cpopular): Observable<Cpopular> {
    return this.http.post<Cpopular>(environment.apiUrl + this.url, cpopular, httpOptions)
      .pipe(
        tap((cpop: Cpopular) => console.log(`added cpopular w/ id=${cpop.id}`))
      );
  }

  updateCpopular(id: number, cpopular: Cpopular): Observable<Cpopular> {
    return this.http.put<Cpopular>(environment.apiUrl + this.url + `/${id}`, cpopular, httpOptions)
      .pipe(
        tap(_ => console.log(`updated cpopular id=${id}`)),
      );
  }

  deleteCpopular(id: number): Observable<Cpopular> {
    return this.http.delete<Cpopular>(environment.apiUrl + this.url + `/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted cpopular ${id}`)),
      );
  }
}
