import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Street } from '../../models/street';
import {environment} from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class StreetService {

  url = '/localization/streets';

  constructor(private http: HttpClient) { }

  getStreets(cpopular_id: string = ''): Observable<Street[]> {
    const params = new HttpParams()
      .set('cpopular_id', cpopular_id);
    return this.http.get<Street[]>(environment.apiUrl + this.url, { params })
      .pipe(
        tap(street => console.log('fetched calles')),
      );
  }

  getStreet(id: number): Observable<Street> {
    return this.http.get<Street>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`fetched calle id=${id}`)),
      );
  }

  addStreet(street: Street): Observable<Street> {
    return this.http.post<Street>(environment.apiUrl + this.url, street, httpOptions)
      .pipe(
        tap((str: Street) => console.log(`added calle w/ id=${str.id}`))
      );
  }

  updateStreet(id: number, street: Street): Observable<Street> {
    return this.http.put<Street>(environment.apiUrl + this.url + `/${id}`, street, httpOptions)
      .pipe(
        tap(_ => console.log(`updated calle id=${id}`)),
      );
  }

  deleteStreet(id: number): Observable<Street> {
    return this.http.delete<Street>(environment.apiUrl + this.url + `/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted calle ${id}`)),
      );
  }
}
