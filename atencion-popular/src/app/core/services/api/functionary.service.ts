import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Functionary } from '../../models/functionary';
import {environment} from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FunctionaryService {

  url = '/nomenclature/functionaries';

  constructor(private http: HttpClient) { }

  getFunctionaries(): Observable<Functionary[]> {
    return this.http.get<Functionary[]>(environment.apiUrl + this.url)
      .pipe(
        tap(functionary => console.log('fetched funcionarios')),
      );
  }

  getFunctionary(id: number): Observable<Functionary> {
    return this.http.get<Functionary>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`fetched funcionario id=${id}`)),
      );
  }

  addFunctionary(functionary: Functionary): Observable<Functionary> {
    return this.http.post<Functionary>(environment.apiUrl + this.url, functionary, httpOptions)
      .pipe(
        tap((func: Functionary) => console.log(`added funcionario w/ id=${func.id}`))
      );
  }

  updateFunctionary(id: number, functionary: Functionary): Observable<Functionary> {
    return this.http.put<Functionary>(environment.apiUrl + this.url + `/${id}`, functionary, httpOptions)
      .pipe(
        tap(_ => console.log(`updated funcionario id=${id}`)),
      );
  }

  deleteFunctionary(id: number): Observable<Functionary> {
    return this.http.delete<Functionary>(environment.apiUrl + this.url + `/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted funcionario ${id}`)),
      );
  }
}
