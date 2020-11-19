import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Type} from '../../models/type';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  url = '/nomenclature/types';

  constructor(private http: HttpClient) { }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(environment.apiUrl + this.url)
      .pipe(
        tap(type => console.log('fetched tipos')),
      );
  }

  getType(id: number): Observable<Type> {
    return this.http.get<Type>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`fetched tipo id=${id}`)),
      );
  }

  addType(type: Type): Observable<Type> {
    return this.http.post<Type>(environment.apiUrl + this.url, type, httpOptions)
      .pipe(
        tap((w: Type) => console.log(`added tipo w/ id=${w.id}`))
      );
  }

  updateType(id: number, type: Type): Observable<Type> {
    return this.http.put<Type>(environment.apiUrl + this.url + `/${id}`, type, httpOptions)
      .pipe(
        tap(_ => console.log(`updated tipo id=${id}`)),
      );
  }

  deleteType(id: number): Observable<Type> {
    return this.http.delete<Type>(environment.apiUrl + this.url + `/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted tipo ${id}`)),
      );
  }
}
