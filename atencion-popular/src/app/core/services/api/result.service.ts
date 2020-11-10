import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Result} from '../../models/result';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  url = '/nomenclature/results';

  constructor(private http: HttpClient) { }

  getResults(): Observable<Result[]> {
    return this.http.get<Result[]>(environment.apiUrl + this.url)
      .pipe(
        tap(result => console.log('fetched resultados')),
      );
  }

  getResult(id: number): Observable<Result> {
    return this.http.get<Result>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`fetched resultado id=${id}`)),
      );
  }

  addResult(result: Result): Observable<Result> {
    return this.http.post<Result>(environment.apiUrl + this.url, result, httpOptions)
      .pipe(
        tap((res: Result) => console.log(`added resultado w/ id=${res.id}`))
      );
  }

  updateResult(id: number, result: Result): Observable<Result> {
    return this.http.put<Result>(environment.apiUrl + this.url + `/${id}`, result, httpOptions)
      .pipe(
        tap(_ => console.log(`updated resultado id=${id}`)),
      );
  }

  deleteResult(id: number): Observable<Result> {
    return this.http.delete<Result>(environment.apiUrl + this.url + `/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted resultado ${id}`)),
      );
  }
}
